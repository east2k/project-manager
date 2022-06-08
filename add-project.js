const mainContent = document.querySelector(".main-content");

const addChallenge = (challenge) => {
    mainContent.innerHTML = ""

    for (let i = 0; i < challenge.length; i++) {
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");
        mainContent.appendChild(projectContainer);

        const projectImage = document.createElement("div");
        projectImage.classList.add("project-img");

        const thumbnail = document.createElement("img");
        thumbnail.setAttribute("alt", "Challlenge Preview Image");
        projectImage.appendChild(thumbnail);
        projectContainer.appendChild(projectImage);

        const projectContent = document.createElement("div");
        projectContent.classList.add("project-content");
        projectContainer.appendChild(projectContent);

        const projectHeader = document.createElement("div");
        projectHeader.classList.add("project-header");
        projectContent.appendChild(projectHeader);

        const projectDescription = document.createElement("div");
        projectDescription.classList.add("project-description");
        projectContent.appendChild(projectDescription);

        const projectTags = document.createElement("div");
        projectTags.classList.add("project-tags");
        projectContent.appendChild(projectTags);

        const projectLinkContainer = document.createElement("div");
        projectLinkContainer.classList.add("project-link-container");
        projectContent.appendChild(projectLinkContainer);

        const liveLink = document.createElement("a");
        liveLink.classList.add("project-link", "site");
        liveLink.innerHTML = "View Project"
        liveLink.setAttribute("target", "_blank");
        projectLinkContainer.appendChild(liveLink);

        const challengeLink = document.createElement("a");
        challengeLink.classList.add("project-link", "challenge");
        challengeLink.innerHTML = "View Challenge"
        challengeLink.setAttribute("target", "_blank");
        projectLinkContainer.appendChild(challengeLink);

        const githubLink = document.createElement("a");
        githubLink.classList.add("project-link", "github");
        githubLink.setAttribute("target", "_blank");
        projectLinkContainer.appendChild(githubLink);

        const githubLogo = document.createElement("img");
        githubLogo.setAttribute("src", "assets/GitHub-Mark-64px.png");
        githubLink.appendChild(githubLogo);

        thumbnail.setAttribute("src", challenge[i].image);
        projectHeader.innerHTML = challenge[i].name;
        projectDescription.innerHTML = challenge[i].description;
        projectImage.style.cssText = "box-shadow: 0px 10px 5px -5px "+ challenge[i].boxShadow;;
        liveLink.setAttribute("href", challenge[i].liveLink);
        challengeLink.setAttribute("href", challenge[i].frontendLink);
        githubLink.setAttribute("href", challenge[i].repositoryLink);

        // Add tags
        for (let e = 0; e < challenge[i].tags.length; e++) {
            const tagContainer = document.createElement("div");
            tagContainer.classList.add(challenge[i].tags[e].toLowerCase());
            tagContainer.innerHTML = challenge[i].tags[e];
            tagContainer.classList.add("tag-container");
            projectTags.appendChild(tagContainer);
        }
    }
}
addChallenge(challengeList);