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
    query = {}

    name = request.args.get("name")
    category = request.args.get("category")
    status = request.args.get("status")

    if name:
        query["name"] = {"$regex": name, "$options": "i"}

    if category:
        query["category"] = {"$regex": category, "$options": "i"}

    if status:
        query["status"] = status

    supplies = list(db.supplies.find(query))

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





@app.route("/supplies/report", methods=["GET"])
def supplies_report():
    # pegar todos os itens
    all_items = list(db.supplies.find({}))

    # converter quantidade para número sem mexer no banco
    def extract_number(qty):
        if not qty:
            return 0
        # extrai o número inicial, ex: "12 unidades" -> 12
        try:
            return int(str(qty).split()[0])
        except:
            return 0

    # calcular totais
    category_map = {}
    total_quantity = 0

    for item in all_items:
        cat = item.get("category", "Sem categoria")
        num_qty = extract_number(item.get("quantity"))

        total_quantity += num_qty

        if cat not in category_map:
            category_map[cat] = {
                "category": cat,
                "items_count": 0,
                "total_quantity": 0
            }

        category_map[cat]["items_count"] += 1
        category_map[cat]["total_quantity"] += num_qty

    # transformar em lista
    by_category = list(category_map.values())

    # identificar validade
    days = int(request.args.get("days", 7))

    expiring = []
    for item in all_items:
        exp = item.get("expirationDate")
        if exp:
            try:
                exp_date = datetime.strptime(exp, "%Y-%m-%d")
                if exp_date <= datetime.utcnow() + timedelta(days=days):
                    item["_id"] = str(item["_id"])
                    expiring.append(item)
            except:
                pass

    return jsonify({
        "summary": {
            "total_items": len(all_items),
            "total_quantity": total_quantity
        },
        "by_category": by_category,
        "expiring_soon": expiring,
        "params": {"days": days}
    }), 200



# Ponto de entrada para rodar a aplicação
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
