const { isValidObjectId } = require("mongoose");
const skillModel = require("./skillModel");

async function getSkillById(skillId) {
  const existingSkill = skillModel.findById(skillId);

  if (existingSkill) {
    return existingSkill;
  }

  return 404;
}

function getSkill(photoTitle) {
  return new Promise(async (resolve, reject) => {
    let skills;

    if (photoTitle || photoTitle !== "") {
      let filter = { title: new RegExp(photoTitle, "i") };
      skills = await skillModel.find(filter).exec();
    } else {
      skills = await skillModel.find({}).exec();
    }

    if (skills.length === 0) {
      reject("[skillStorage getSkill] No matching results");
    }

    resolve(skills);
  });
}

function addSkill(skill) {
  const newSkill = new skillModel(skill);
  newSkill.save();
}

function updateSkill(skillId, skill) {
  return new Promise(async (resolve, reject) => {
    if (!skillId || !isValidObjectId(skillId)) {
      reject("[skillStorage getSkill] invalid input params");
    }
    const updatedSkill = await skillModel.findByIdAndUpdate(skillId, skill);
    resolve(updatedSkill);
  });
}

function deleteSkill(skillId) {
  return new Promise(async (resolve, reject) => {
    if (!skillId || !isValidObjectId(skillId)) {
      reject("[skillStorage getSkill] invalid input params");
    }
    const deletedSkill = skillModel.deleteOne({ _id: skillId });
    resolve(deletedSkill);
  });
}

module.exports = {
  getSkillById,
  getSkill,
  addSkill,
  updateSkill,
  deleteSkill,
};
