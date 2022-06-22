// Author: Denisovich

const projectElement = document.querySelector(".projects")

fetch("./assets.json")
    .then((res) => res.json())
    .then((json) => {
        json.projects.forEach((project) => {
            const newNode = document.createElement("img")
            newNode.src = project.thumbnail
            projectElement.appendChild(newNode)
        })
    })
