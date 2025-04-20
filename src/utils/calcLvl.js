export function calculateUserLevel(totalExperience) {
    const baseLvl = 1000;
    let userLvl;

    if (totalExperience < baseLvl) {
        userLvl = totalExperience / baseLvl
    } else {
        userLvl = (Math.log(totalExperience / baseLvl) ** 2.5) + 1;
    }

    return userLvl.toFixed(2);
}