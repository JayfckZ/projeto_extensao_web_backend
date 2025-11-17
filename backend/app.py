from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

# Inicializa a aplicação Flask
app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://mongo:27017/")
db = client.ongdb


# Rota para retornar todos os projetos (GET)
@app.route("/projects", methods=["GET"])
def get_route():
    projects = list(db.projects.find({}))

    for project in projects:
        project["_id"] = str(project["_id"])
    return jsonify(projects), 200

# Rota para adicionar um novo projeto (POST)
@app.route("/projects", methods=["POST"])
def add_project():
    new_project = request.get_json()
    result = db.projects.insert_one(new_project)

    return jsonify(str(result.inserted_id)), 201


# Rota para detalhes de um projeto específico (GET)
@app.route("/projects/<project_id>", methods=["GET"])
def get_project(project_id):
    project = db.projects.find_one({"_id": ObjectId(project_id)})

    if project:
        project["_id"] = str(project["_id"])
        return jsonify(project), 200

    return jsonify({"error": "Projeto não encontrado"}), 404


# Rota para remover um projeto do MongoDB
@app.route("/projects/<project_id>", methods=["DELETE"])
def delete_project(project_id):
    result = db.projects.delete_one({"_id": ObjectId(project_id)})

    if result.deleted_count > 0:
        return jsonify({"message": "Projeto deletado com sucesso"}), 200

    return jsonify({"error": "Projeto não encontrado"}), 404


# Rota para atualizar um projeto
@app.route("/projects/<project_id>", methods=["PUT"])
def update_project(project_id):
    updated_data = request.get_json()
    result = db.projects.update_one(
        {"_id": ObjectId(project_id)}, {"$set": updated_data}
    )

    if result.matched_count > 0:
        return jsonify({"message": "Projeto atualizado com sucesso"}), 200

    return jsonify({"error": "Projeto não encontrado"}), 404


# Ponto de entrada para rodar a aplicação
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
