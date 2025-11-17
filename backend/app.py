from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime, timedelta

# Inicializa a aplicação Flask
app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://mongo:27017/")
db = client.ongdb
supplies_collection = db.supplies


# Rota para retornar todos os Mantimentos (GET)
@app.route("/supplies", methods=["GET"])
def get_route():
    supplies = list(db.supplies.find({}))

    for supply in supplies:
        supply["_id"] = str(supply["_id"])
    return jsonify(supplies), 200


# Rota para adicionar um novo Mantimento (POST)
@app.route("/supplies", methods=["POST"])
def add_supply():
    new_supply = request.get_json()
    result = db.supplies.insert_one(new_supply)

    return jsonify(str(result.inserted_id)), 201


# Rota para detalhes de um Mantimento específico (GET)
@app.route("/supplies/<supply_id>", methods=["GET"])
def get_supply(supply_id):
    supply = db.supplies.find_one({"_id": ObjectId(supply_id)})

    if supply:
        supply["_id"] = str(supply["_id"])
        return jsonify(supply), 200

    return jsonify({"error": "Mantimento não encontrado"}), 404


# Rota para remover um Mantimento do MongoDB
@app.route("/supplies/<supply_id>", methods=["DELETE"])
def delete_supply(supply_id):
    result = db.supplies.delete_one({"_id": ObjectId(supply_id)})

    if result.deleted_count > 0:
        return jsonify({"message": "Mantimento deletado com sucesso"}), 200

    return jsonify({"error": "Mantimento não encontrado"}), 404


# Rota para atualizar um Mantimento
@app.route("/supplies/<supply_id>", methods=["PUT"])
def update_supply(supply_id):
    updated_data = request.get_json()
    result = db.supplies.update_one(
        {"_id": ObjectId(supply_id)}, {"$set": updated_data}
    )

    if result.matched_count > 0:
        return jsonify({"message": "Mantimento atualizado com sucesso"}), 200

    return jsonify({"error": "Mantimento não encontrado"}), 404


def serialize_supply(doc):
    doc["_id"] = str(doc["_id"])
    # garante campos padrão mesmo se não existirem
    doc.setdefault("nome", "")
    doc.setdefault("categoria", "")
    doc.setdefault("quantidade", 0)
    doc.setdefault("status", "desconhecido")
    doc.setdefault("responsavel", "")
    doc.setdefault("notas", "")
    doc.setdefault("data_entrada", None)
    doc.setdefault("validade", None)
    return doc


@app.route("/supplies", methods=["GET"])
def list_supplies():
    query = {}

    name = request.args.get("name")
    category = request.args.get("category")
    status = request.args.get("status")

    if name:
        query["name"] = {"$regex": name, "$options": "i"}

    if category:
        query["category"] = category

    if status:
        query["status"] = status

    supplies = [serialize_supply(s) for s in supplies_collection.find(query)]

    return jsonify(supplies), 200


@app.route("/supplies/report", methods=["GET"])
def stock_report():
    # total de itens por categoria
    pipeline = [
        {
            "$group": {
                "_id": "$category",
                "total_quantity": {"$sum": "$quantity"},
                "items_count": {"$sum": 1},
            }
        }
    ]

    by_category_raw = list(supplies_collection.aggregate(pipeline))

    by_category = [
        {
            "category": item["_id"],
            "total_quantity": item["total_quantity"],
            "items_count": item["items_count"],
        }
        for item in by_category_raw
    ]

    total_items = supplies_collection.count_documents({})
    total_quantity = sum(c["total_quantity"] for c in by_category)

    # itens prestes a vencer
    days_to_expire = int(request.args.get("days_to_expire", 7))
    now = datetime.utcnow()
    limit_date = now + timedelta(days=days_to_expire)

    expiring_cursor = supplies_collection.find(
        {"expiry_date": {"$ne": None, "$lte": limit_date}}
    )

    expiring_soon = [serialize_supply(doc) for doc in expiring_cursor]

    report = {
        "summary": {"total_items": total_items, "total_quantity": total_quantity},
        "by_category": by_category,
        "expiring_soon": expiring_soon,
        "params": {"days_to_expire": days_to_expire},
    }

    return jsonify(report), 200


# Ponto de entrada para rodar a aplicação
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
