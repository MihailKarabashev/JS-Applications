function loadCommits() {
  let username = document.getElementById("username");
  let repo = document.getElementById("repo");
  let ulCommints = document.getElementById("commits");
  let url = `https://api.github.com/repos/${username.value}/${repo.value}/commits`;

  async function getGitHubRepos() {
    let statusObj = { statusCode: "", statusText: "" };
    try {
      const response = await fetch(url);
      statusObj.statusCode = response.status;
      statusObj.statusText = response.statusText;

      statusCode = response.status;
      let data = await response.json();

      for (const key in data) {
        let authorName = data[key].commit.author.name;
        let message = data[key].commit.message;

        let liElement = createElement("li", `${authorName}: ${message}`);
        ulCommints.appendChild(liElement);
      }
    } catch (error) {
      let liElement = createElement(
        "li",
        `Error: ${statusObj.statusCode} (Not Found)`
      );
      ulCommints.appendChild(liElement);
      console.log(statusObj.statusText);
    }
  }

  function createElement(el, textContent) {
    let element = document.createElement(el);
    element.textContent = textContent;
    return element;
  }

  getGitHubRepos();

  username.value = "";
  repo.value = "";
}
