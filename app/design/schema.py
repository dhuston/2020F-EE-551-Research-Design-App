from marshmallow import Schema, fields

class GoalSchema(Schema):
  id = fields.Int(required=True)
  goal_name = fields.Str()
  indication = fields.Str()
  investigator = fields.Str()
class StudySchema(Schema):
  id = fields.Int(required=True)
  study_name = fields.Str()
  indication = fields.Str()
  investigator = fields.Str()
class AnalysisSchema(Schema):
  id = fields.Int(required=True)
  analysis_name = fields.Str()
  indication = fields.Str()
  investigator = fields.Str()
class DatasertSchema(Schema):
  id = fields.Int(required=True)
  dataset_name = fields.Str()
  indication = fields.Str()
  investigator = fields.Str()