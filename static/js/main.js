// Get search form and page links
const searchForm = document.querySelector("#searchForm")
const pageLinks = document.querySelectorAll(".page-link")
const tagButtons = document.querySelectorAll(".project-tag")

// Ensure search form exists
if (searchForm) {
    pageLinks.forEach((button) => {
        console.log(button)
        button.addEventListener("click", function(event) {
            event.preventDefault()
            
            const page = this.dataset.page;
            
            // Add hidden search input to form
            searchForm.innerHTML += `<input value=${page} name="page" hidden />`
        
            searchForm.submit()
        })
    })
}

if (tagButtons) {
    tagButtons.forEach((tag) => {
        tag.addEventListener("click", function(event) {
            const tagId = event.target.dataset.tag;
            const projectId = event.target.dataset.project

            console.log(tagId)
            console.log(projectId)

            fetch("http://localhost:8000/api/remove-tag/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"project": projectId, "tag": tagId})
            })
            .then(response => response.json())
            .then(data => {
                event.target.remove()
            })
        })
    })
}