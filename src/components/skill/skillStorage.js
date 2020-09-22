const { resolve } = require("path");
const { findByIdAndDelete } = require("../photo/photoModel");
const SkillModel = require("./skillModel");

async function getSkillById(skillId) {
  const existingSkill = SkillModel.findById(skillId);

  if (existingSkill) {
    return existingSkill;
  }

  return 404;
}

function getSkill(photoTitle) {
  return new Promise(async (resolve, reject) => {
    let skills;

    if (photoTitle) {
      let filter = { title: new RegExp(photoTitle, "i") };
      skills = await SkillModel.find(filter);
    } else {
      skills = await SkillModel.find({});
    }

    if (skills.length === 0) {
      reject("No matching results");
    }

    resolve(skills);
  });
}

function addSkill(skill) {
    const newSkill = new SkillModel(skill);
    newSkill.save();
}

function updateSkill(skillId, skill) {
    return new Promise((resolve, reject)=>{
        if(skillId){
            const updatedSkill = await SkillModel.findByIdAndUpdate(skillId, skill);
            resolve(updatedSkill);
        }

        reject("Could not update photo");
    });
}

function deleteSkill(skillId) {
    return new Promise(async (resolve, reject)=>{
        if (skillId) {
            const deletedPhoto = findByIdAndDelete(skillId);
            resolve(deletedPhoto);
        }

        reject("Could not delete photo");
    });
}

module.exports = {
  getSkillById,
  getSkill,
  addSkill,
  updateSkill,
  deleteSkill,
};
