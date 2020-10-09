//fungsi show and hide
const show_and_hide = document.querySelector("#show-hide-button");
const form = document.querySelector("form");

show_and_hide.addEventListener("click", function () {
  if (form.style.display === "none") {
    form.style.display = "block";
    show_and_hide.textContent = "Hide Form";
  } else {
    form.style.display = "none";
    show_and_hide.textContent = "Show Form";
  }
});

//fakultas dan prodi
const faculties = [
  {
    name: "Fakultas Ilmu Komputer",
    sub: ["Informatika", "Sistem Informasi"],
  },
  {
    name: "Fakultas Keperawatan",
    sub: ["Profesi Ners", "Ilmu Keperawatan"],
  },
  {
    name: "Fakultas Ekonomi dan Bisnis (UBS)",
    sub: ["Akuntansi", "Manajemen"],
  },
  {
    name: "Fakultas Keguruan dan Ilmu Pendidikan",
    sub: ["Agama", "Bahasa Inggris", "Ekonomi", "Guru Luar Sekolah"],
  },
  {
    name: "Fakultas Pertanian",
    sub: ["Agroteknologi"],
  },
  {
    name: "Fakultas Filsafat",
    sub: ["Ilmu Filsafat"],
  },
  {
    name: "Pascasarjana",
    sub: ["Manajemen", "Teologi"],
  },
];

const faculty_option = document.querySelector("#faculty-list-form");

for (faculty of faculties) {
  let tag = document.createElement("option");
  let text = document.createTextNode(faculty.name);
  tag.appendChild(text);
  faculty_option.appendChild(tag);
}

let program_study = document.querySelector("#prodi-list-form");

faculty_option.addEventListener("change", function (e) {
  let options = e.target.value;

  //check validasi fakultas
  if (faculties.map((faculty) => faculty.name).indexOf(options) != -1) {
    faculties.filter((i) => {
      if (i.name == options) {
        program_study.innerHTML = "";

        let tag = document.createElement("option");
        let text = document.createTextNode("SELECT PROGRAM OF STUDY");
        tag.appendChild(text);
        program_study.appendChild(tag);

        for (j of i.sub) {
          let tag = document.createElement("option");
          let text = document.createTextNode(j);
          tag.appendChild(text);
          program_study.appendChild(tag);
        }
      }
    });
  } else {
    program_study.innerHTML = "";

    let tag = document.createElement("option");
    let text = document.createTextNode("SELECT PROGRAM OF STUDY");
    tag.appendChild(text);
    program_study.appendChild(tag);
  }
});
//end check validasi fakultas

let students = [
  {
    nim: "105021810017",
    name: "Aldio Christo Kaminang",
    gender: "Male",
    faculty: "Fakultas Ilmu Komputer",
    program_study: "Informatika",
  },
];

//mengambil semua data student
const submit_button = document.querySelector("#button-submit");

submit_button.addEventListener("click", () => {
  let student_nim = document.querySelector("#nim").value;
  let student_name = document.querySelector("#name").value;
  let student_gender = document.querySelector('input[name="gender"]:checked')
    .value;
  let student_faculty = document.querySelector("#faculty-list-form").options[
    document.querySelector("#faculty-list-form").selectedIndex
  ].value;
  let student_program_study = document.querySelector("#prodi-list-form")
    .options[document.querySelector("#prodi-list-form").selectedIndex].value;

  //validating form data
  if (/^\d+$/.test(student_nim) != true) {
    alert("Invalin Student NIM");
    return;
  }

  if (/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(student_name) != true) {
    alert("Invalid Student Name");
    return;
  }

  if (student_faculty == "SELECT FACULTY") {
    alert("Invalid Faculty");
    return;
  }

  if (student_program_study == "SELECT PROGRAM OF STUDY") {
    alert("Invalid Program Study");
    return;
  }

  //append valid form data to student list
  students.push({
    nim: student_nim,
    name: student_name,
    gender: student_gender,
    faculty: student_faculty,
    program_study: student_program_study,
  });

  //update student list and reset form data
  alert("Berhasil");
  update_student_list();
  document.querySelector("form").reset();
});
//end get all from data

//display all students
const student_list = document.querySelector("#list-student");

function update_student_list(fiter_name) {
  student_list.innerHTML = "";

  for (student of students) {
    let tr = document.createElement("tr");

    for (key in student) {
      let td = document.createElement("td");
      td.appendChild(document.createTextNode(student[key]));

      tr.appendChild(td);
    }

    //action
    let action = document.createElement("td");
    let trash_icon = `<button type="button" onclick="delete_row(this)" class="btn btn-danger">Delete</button>`;
    action.innerHTML = trash_icon;
    tr.appendChild(action);

    student_list.appendChild(tr);
  }
}
update_student_list();
//end display all students

//delete row
function delete_row(btn) {
  var row = btn.parentNode.parentNode;

  student_nim = row.querySelector("tr td").textContent;

  students = students.filter((s) => {
    return s.nim != student_nim;
  });

  update_student_list();

  //don't forget to reset input text
  document.querySelector("#sstudent-form-search").reset();
}
//end delete row

//search students by name
let search_student = document.querySelector("#student-search");

search_student.addEventListener("input", () => {
  if (search_student.length == 0) {
    update_student_list();
  } else {
    student_list.innerHTML = "";

    //filter the student
    let filtered_students = students.filter((s) => {
      return s.name.toLowerCase().includes(search_student.value.toLowerCase());
    });

    for (student of filtered_students) {
      let tr = document.createElement("tr");

      for (key in student) {
        let td = document.createElement("td");
        td.appendChild(document.createTextNode(student[key]));

        tr.appendChild(td);
      }

      //action #delete,
      let action = document.createElement("td");
      let delete_icon = `<button type="button" onclick="delete_row(this)" class="btn btn-danger">Delete</button>`;
      action.innerHTML = delete_icon;
      tr.appendChild(action);

      student_list.appendChild(tr);
    }
  }
});

//disable "Enter"
search_student.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
  }

  return false;
});
//end search student by name

//student filter
const filter_by_faculty = document.querySelector("#filter-by-faculty");

for (i of faculties) {
  const parent = document.createElement("option");
  const child = document.createTextNode(i.name);
  parent.append(child);
  filter_by_faculty.appendChild(parent);
}

const filter_faculty_button = document.querySelector("#filter-faculty-button");
filter_faculty_button.addEventListener("click", () => {
  const selected_faculty =
    filter_by_faculty.options[filter_by_faculty.selectedIndex].value;

  //update student list
  if (selected_faculty != "SELECT FACULTY") {
  }
});
