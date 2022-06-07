const dropdown = document.getElementsByClassName("dropdown");
const dropdownOptions = document.getElementsByClassName("dropdown-options");

// Dropdown toggle
for (let i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener('click', () => {
        dropdown[i].classList.toggle("expand");
        clickOutside(i);

    });
}

// When clicked outside dropdown
const clickOutside = (i) => {
    document.addEventListener('click', (e) => {
        if (!dropdown[i].contains(e.target)) {
            dropdown[i].classList.remove("expand");
        }
    });
}

let checker = (filter) => {
    const areFalseDifficulty = Object.values(filter.difficulty).every(value => value === false);
    const areFalseType = Object.values(filter.type).every(value => value === false);
    // console.log(areFalseDifficulty && areFalseType)
    if (areFalseDifficulty && areFalseType) {
        addChallenge(challengeList)
    } else if (!areFalseDifficulty && areFalseType || areFalseDifficulty && !areFalseType) {
        filterChallenges(challengeList, filter, true);
    } else {
        filterChallenges(challengeList, filter, false);
    }
};

const filterChallenges = (challenge, filter, status) => {
    const filterKeys = Object.keys(filter);
    const difficultyKeys = Object.keys(filter.difficulty);
    const typeKeys = Object.keys(filter.type);

    const filterList = challenge.filter((challenge) => {
        let include = true,
            includeDiff = false,
            includeType = false;
        for (let i = 0; i < filterKeys.length; i++) {
            if (filterKeys[i] === "difficulty") {
                for (let diff of difficultyKeys) {
                    if (diff === challenge.tags[0].toLowerCase() && filter.difficulty[diff]) includeDiff = true;
                }
            } else if (filterKeys[i] === "type") {
                for (let type of typeKeys) {
                    for (let e = 1; e < challenge.tags.length; e++) {
                        if (type === challenge.tags[e].toLowerCase()) {
                            if ((type === "html" && filter.type[type]) && !challenge.tags.includes("JS")) includeType = true;
                            if ((type === "js" && filter.type[type])) includeType = true;
                        }
                    }
                }
            }
        }
        if (!includeDiff && !includeType) include = false;
        if (status) {
            if (!includeDiff && includeType) include = true;
            else if (includeDiff && !includeType) include = true;
        } else {
            if (!includeDiff && includeType) include = false;
            else if (includeDiff && !includeType) include = false;
            else if (includeDiff || includeType) include = true;
        }
        return include;
    });
    addChallenge(filterList)
}

// Filters Object
const filters = {
    difficulty: {
        newbie: false,
        junior: false,
        intermediate: false,
        advanced: false
    },
    type: {
        html: false,
        css: false,
        js: false
    }
}

// Update Filters depending on clicked

const updateFilterObject = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const checked = event.target.checked;

    filters[name][value] = checked
    // filterChallenges(challengeList, filters);
    checker(filters);
}

const difficultyList = document.querySelectorAll("input[name='difficulty'");
const typeList = document.querySelectorAll("input[name='type'");

// add listener to difficulty list
for (let i = 0; i < difficultyList.length; i++) {
    difficultyList[i].addEventListener('change', updateFilterObject)
}
for (let i = 0; i < typeList.length; i++) {
    typeList[i].addEventListener('change', updateFilterObject)
}