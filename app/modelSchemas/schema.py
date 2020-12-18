from marshmallow import Schema, fields

class GoalSchema(Schema):
  id = fields.Int(required=True)
  goal_name = fields.Str()
  goal_indication = fields.Str()
  goal_investigator = fields.Str()
class StudySchema(Schema):
  id = fields.Int(required=True)
  study_name = fields.Str()
  study_objective = fields.Str()
  study_type = fields.Str()
  study_manager = fields.Str()
class AnalysisSchema(Schema):
  id = fields.Int(required=True)
  analysis_name = fields.Str()
  analysis_analyst = fields.Str()
  analysis_type= fields.Str()
class DatasetSchema(Schema):
  id = fields.Int(required=True)
  dataset_name = fields.Str()
  dataset_owner = fields.Str()
  dataset_type = fields.Str()
  dataset_location = fields.Str()