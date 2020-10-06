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
    let filter = { title: new RegExp(photoTitle, "i") };
    let skills = await skillModel.find(filter).exec();

    if (skills.length === 0) {
      reject("No matching results");
    }

    resolve(skills);
  });
}

function addSkill(skill) {
    const newSkill = new skillModel(skill);
    newSkill.save();
}

function updateSkill(skillId, skill) {
    return new Promise(async(resolve, reject)=>{
        if(skillId){
            const updatedSkill = await skillModel.findByIdAndUpdate(skillId, skill);
            resolve(updatedSkill);
        }

        reject("Could not update photo");
    });
}

function deleteSkill(skillId) {
    return new Promise(async (resolve, reject)=>{
        if (skillId) {
            const deletedPhoto = skillModel.findByIdAndDelete(skillId);
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
