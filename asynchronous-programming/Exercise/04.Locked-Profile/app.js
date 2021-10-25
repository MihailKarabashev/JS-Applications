function lockedProfile() {
  let main = document.querySelector("main");
  main.innerHTML = "";
  loadData(main);

  main.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") {
      return;
    }
  });
}

async function loadData(main) {
  let response = await fetch(
    "http://localhost:3030/jsonstore/advanced/profiles"
  );
  let data = await response.json();

  Object.values(data).map((profile) => {
    let div = e(
      "div",
      { className: "profile" },
      e("img", { src: "./iconProfile2.png", className: "userIcon" }),
      e("label", {}, "Lock"),
      e("input", {
        type: "radio",
        name: profile._id,
        value: "lock",
        checked: "checked",
      }),
      e("label", {}, "Unlock"),
      e("input", { type: "radio", name: profile._id, value: "unlock" }),
      e("br"),
      e("hr"),
      e("label", {}, "Username"),
      e("input", {
        type: "text",
        name: profile.username,
        value: profile.username,
        disabled: "true",
        readonly: "true",
      }),
      e(
        "div",
        { id: "user1HiddenFields" },
        e("hr"),
        e("label", {}, "Email"),
        e("input", {
          type: "email",
          name: profile.email,
          value: profile.email,
          disabled: "true",
          readonly: "true",
        }),
        e("label", {}, "Age"),
        e("input", {
          type: "email",
          name: profile.age,
          value: profile.age,
          disabled: "true",
          readonly: "true",
        })
      ),
      e("button", {}, "Show More")
    );

    main.appendChild(div);
  });
  /*
  <div class="profile">
				<img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user1Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="user1Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user1Username" value="" disabled readonly />
				<div id="user1HiddenFields">
					<hr>
					<label>Email:</label>
					<input type="email" name="user1Email" value="" disabled readonly />
					<label>Age:</label>
					<input type="email" name="user1Age" value="" disabled readonly />
				</div>
				<button>Show more</button>
			</div>
            ?*/
}

function e(type, attributes, ...content) {
  const result = document.createElement(type);

  for (let [attr, value] of Object.entries(attributes || {})) {
    if (attr.substring(0, 2) == "on") {
      result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
    } else {
      result[attr] = value;
    }
  }

  content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

  content.forEach((e) => {
    if (typeof e == "string" || typeof e == "number") {
      const node = document.createTextNode(e);
      result.appendChild(node);
    } else {
      result.appendChild(e);
    }
  });

  return result;
}
