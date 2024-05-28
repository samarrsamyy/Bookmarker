var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");

var sites = [];

if (localStorage.getItem("Bookmark Sites") !== null) {
  sites = JSON.parse(localStorage.getItem("Bookmark Sites"));
  displaySite();
}

function addSite() {
  if (
    validationInput(bookmarkName, "errName") &&
    validationInput(bookmarkURL, "errURL")
  ) {
    var site = {
      name: bookmarkName.value,
      sURL: bookmarkURL.value,
    };
    sites.push(site);

    clear();

    displaySite();

    localStorage.setItem("Bookmark Sites", JSON.stringify(sites));

    bookmarkName.classList.remove("is-valid");
    bookmarkURL.classList.remove("is-valid");
  }
}

function clear() {
  bookmarkName.value = null;
  bookmarkURL.value = null;
}

function displaySite() {
  sitesBox = ``;

  for (i = 0; i < sites.length; i++) {
    sitesBox += `
    
    <tr>
    <th scope="row">${i + 1}</th>
    <td>${sites[i].name}</td>
    <td><button onclick=" visitSite('${
      sites[i].sURL
    }')" type="button" class="btn btn-navy "><i class="fa-solid fa-eye"></i> Visit</button></td>
    <td><button onclick=" deleteSite(${i}) " type="button" class="btn btn-orange"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>
 
    `;
  }
  document.getElementById("tbody").innerHTML = sitesBox;
}

function visitSite(url) {
  window.open(url, "_blank");
}

function deleteSite(index) {
  sites.splice(index, 1);
  displaySite();
  localStorage.setItem("Bookmark Sites", JSON.stringify(sites));
}

/* function validationName() {
  var text = bookmarkName.value;
  var regex = /^.{3,}$/;

  if (regex.test(text)) {
    bookmarkName.classList.add("is-valid");
    bookmarkName.classList.remove("is-invalid");
    errName.classList.add("d-none");
    return true;
  } else {
    bookmarkName.classList.remove("is-valid");
    bookmarkName.classList.add("is-invalid");
    errName.classList.remove("d-none");
    return false;
  }
}

function validationURL() {
  var text = bookmarkURL.value;
  var regex = /^((ftp|http|https):\/\/)?www\.([A-Z]+)\.([A-Z]{2,})$/i;

  if (regex.test(text)) {
    bookmarkURL.classList.add("is-valid");
    bookmarkURL.classList.remove("is-invalid");
    errURL.classList.add("d-none");
    return true;
  } else {
    bookmarkURL.classList.remove("is-valid");
    bookmarkURL.classList.add("is-invalid");
    errURL.classList.remove("d-none");
    return false;
  }
} */

function validationInput(site, errId) {
  var text = site.value;
  var regex = {
    bookmarkName: /^.{3,}$/i,
    bookmarkURL: /^((ftp|http|https):\/\/)www\.([A-Z]+)\.([A-Z]{2,})$/i,
  };
  var errMsg = document.getElementById(errId);

  if (regex[site.id].test(text)) {
    site.classList.add("is-valid");
    site.classList.remove("is-invalid");
    errMsg.classList.add("d-none");
    return true;
  } else {
    site.classList.remove("is-valid");
    site.classList.add("is-invalid");
    errMsg.classList.remove("d-none");
    return false;
  }
}
