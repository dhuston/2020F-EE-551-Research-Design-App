from flask_oidc import OpenIDConnect
from flask import Flask, json, g, request
from app.design.service import Service as design
from app.design.schema import GithubRepoSchema
from flask_cors import CORS

app = Flask(__name__)
app.config.update({
  'OIDC_CLIENT_SECRETS': './../../../../client_secrets.json',
  'OIDC_RESOURCE_SERVER_ONLY': True
})
oidc = OpenIDConnect(app)
CORS(app)

@app.route("/designs", methods=["GET"])
@oidc.accept_token(True)
def index():
  return json_response(design(g.oidc_token_info['sub']).find_all_designs())


@app.route("/designs", methods=["POST"])
@oidc.accept_token(True)
def create():
  research_design = GithubRepoSchema().load(json.loads(request.data))
  
  if research_design.errors:
    return json_response({'error': research_design.errors}, 422)

  design = design(g.oidc_token_info['sub']).create_design_for(research_design)
  return json_response(design)


@app.route("/design/<int:research_id>", methods=["GET"])
@oidc.accept_token(True)
def show(research_id):
  design = design(g.oidc_token_info['sub']).find_design(research_id)

  if design:
    return json_response(design)
  else:
    return json_response({'error': 'design not found'}, 404)


@app.route("/design/<int:research_id>", methods=["PUT"])
@oidc.accept_token(True)
def update(research_id):
   research_design = GithubRepoSchema().load(json.loads(request.data))
  
   if research_design.errors:
     return json_response({'error': research_design.errors}, 422)

   design_service = design(g.oidc_token_info['sub'])
   if design_service.update_design_with(research_id, research_design):
     return json_response(research_design.data)
   else:
     return json_response({'error': 'design not found'}, 404)


@app.route("/design/<int:research_id>", methods=["DELETE"])
@oidc.accept_token(True)
def delete(research_id):
  design_service = design(g.oidc_token_info['sub'])
  if design_service.delete_design_for(research_id):
    return json_response({})
  else:
    return json_response({'error': 'design not found'}, 404)


def json_response(payload, status=200):
  return (json.dumps(payload), status, {'content-type': 'application/json'})