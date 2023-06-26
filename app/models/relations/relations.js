const Consequence = require("../consequenceModel")
const Effort = require ("../effortModel")
const Reason = require("../reasonModel")
const Repayment = require("../repaymentModel")
const Event = require("../eventModel")
const User = require("../userModel")
// const EventStateModel = require("../eventStateModel")
const BusinessLine = require("../dictModels/businessLine")
const Client = require("../dictModels/client")
const ConsequenceType = require("../dictModels/consequenceType")
const Cpr = require("../dictModels/cpr")
const Currency = require("../dictModels/currency")
const DefenceLine = require("../dictModels/defenceLine")
const FunctBlock = require("../dictModels/functBlock")
const OrgStructure = require("../dictModels/functBlock")
const OtherRisk = require("../dictModels/otherRisk")
const Process = require("../dictModels/process")
const ReasonType = require("../dictModels/reasonType")
const RepaymentType = require("../dictModels/repaymentType")
const RepaymentTypeGroup = require("../dictModels/repaymentTypeGroup")
const Researcher = require("../dictModels/researcher")
const RiskType = require("../dictModels/riskType")
const SourceType = require("../dictModels/sourceType")
const Status = require("../dictModels/status")


//Event model association
Event.hasMany(User)
User.belongsTo(Event)

Event.hasMany(Reason)
Reason.belongsTo(Event)

Event.hasMany(Effort)
Effort.belongsTo(Event)

Event.hasMany(Consequence,{as: {plural: 'consequences', singular: 'consequence'}})
Consequence.belongsTo(Event,{as: {plural: 'events', singular: 'event'}})

Status.hasMany(Event)
Event.belongsTo(Status)

Client.hasMany(Event)
Event.belongsTo(Client)

DefenceLine.hasMany(Event)
Event.belongsTo(DefenceLine)

Researcher.hasMany(Event)
Event.belongsTo(Researcher)

OrgStructure.hasMany(Event)
Event.belongsTo(OrgStructure)


// reason model association
Process.hasMany(Reason)
Reason.belongsTo(Process)

FunctBlock.hasMany(Reason)
Reason.belongsTo(FunctBlock)

RiskType.hasMany(Reason)
Reason.belongsTo(RiskType)

OrgStructure.hasMany(Reason)
Reason.belongsTo(OrgStructure)

ReasonType.hasMany(Reason)
Reason.belongsTo(ReasonType)


// consequence model association
BusinessLine.hasMany(Consequence)
Consequence.belongsTo(BusinessLine)

FunctBlock.hasMany(Consequence)
Consequence.belongsTo(FunctBlock)

RiskType.hasMany(Consequence)
Consequence.belongsTo(RiskType)

OrgStructure.hasMany(Consequence)
Consequence.belongsTo(OrgStructure)

Cpr.hasMany(Consequence)
Consequence.belongsTo(Cpr)

SourceType.hasMany(Consequence)
Consequence.belongsTo(SourceType)

ConsequenceType.hasMany(Consequence)
Consequence.belongsTo(ConsequenceType)

Currency.hasMany(Consequence)
Consequence.belongsTo(Currency)

Consequence.hasMany(Repayment)
Repayment.belongsTo(Consequence)

OtherRisk.belongsToMany(Consequence,{through:'OtherRiskModel_ConsequenceModel'})
Consequence.belongsToMany(OtherRisk,{through:'OtherRiskModel_ConsequenceModel'})


//repayment model association
Currency.hasMany(Repayment)
Repayment.belongsTo(Currency)

RepaymentType.hasMany(Repayment)
Repayment.belongsTo(RepaymentType)

RepaymentTypeGroup.hasMany(Repayment)
Repayment.belongsTo(RepaymentTypeGroup)



// effort model association
OrgStructure.hasMany(Effort)
Effort.belongsTo(OrgStructure)

Status.hasMany(Effort)
Effort.belongsTo(Status)









