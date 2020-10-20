//STUDENTS
let students = [
  {
    nim: "105021810017",
    name: "Aldio Christo Kaminang",
    gender: "Male",
    faculty: "Fakultas Ilmu Komputer",
    program_study: "Informatika",
  },
  {
    nim: "105021810018",
    name: "John Dexter",
    gender: "Male",
    faculty: "Fakultas Ilmu Komputer",
    program_study: "Sistem Informasi",
  },
  {
    nim: "105021810019",
    name: "Christoper John",
    gender: "Male",
    faculty: "Fakultas Ekonomi dan Bisnis (UBS)",
    program_study: "Manajemen",
  },
  {
    nim: "105021810020",
    name: "Jeane Indriani Tantu",
    gender: "Female",
    faculty: "Fakultas Keperawatan",
    program_study: "Ilmu Keperawatan",
  },
  {
    nim: "105021810021",
    name: "Geysler Takasihaeng",
    gender: "Male",
    faculty: "Fakultas Ilmu Komputer",
    program_study: "Informatika",
  },
  {
    nim: "105021810022",
    name: "Jovanka Dexter",
    gender: "Female",
    faculty: "Fakultas Ilmu Komputer",
    program_study: "Sistem Informasi",
  },
  {
    nim: "105021810023",
    name: "Jovial Lopez",
    gender: "Male",
    faculty: "Fakultas Ilmu Komputer",
    program_study: "Sistem Informasi",
  },
];

//FAKULTAS DAN KAPRODI
const fakultas = [
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
    name: "ASMIK",
    sub: ["D3 Sekretaris"],
  },
  {
    name: "Pascasarjana",
    sub: ["Manajemen", "Teologi"],
  },
];

//FUNGSI SHOW AND HIDE
const shwowAndHide = document.querySelector("#show-hide-button");
const form = document.querySelector("form");

shwowAndHide.addEventListener("click", function () {
  if (form.style.display === "none") {
    form.style.display = "block";
    shwowAndHide.textContent = "Hide Form";
  } else {
    form.style.display = "none";
    shwowAndHide.textContent = "Show Form";
  }
});

//CEK VALIDASI
const option_faculty = document.querySelector("#faculty-list-form");

for (faculty of fakultas) {
  let tag = document.createElement("option");
  let text = document.createTextNode(faculty.name);
  tag.appendChild(text);
  option_faculty.appendChild(tag);
}

let program_study = document.querySelector("#prodi-list-form");

option_faculty.addEventListener("change", function (e) {
  let options = e.target.value;

  //CEK VALIDASI FAKULTAS
  if (fakultas.map((faculty) => faculty.name).indexOf(options) != -1) {
    fakultas.filter((i) => {
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
//END CEK VALIDASI

//AMBIL SEMUA DATA STUDENTS
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

  //VALIDASI FROM DATA
  if (/^\d+$/.test(student_nim) != true) {
    alert("INVALID STUDENT NIM");
    return;
  }

  if (/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(student_name) != true) {
    alert("INVALID STUDENT NAME");
    return;
  }

  if (student_faculty == "SELECT FACULTY") {
    alert("INVALID FACULTY");
    return;
  }

  if (student_program_study == "SELECT PROGRAM OF STUDY") {
    alert("INVALID PROGRAM OF STUDY");
    return;
  }

  //APPEND TO DATA STUDENT LIST
  students.push({
    nim: student_nim,
    name: student_name,
    gender: student_gender,
    faculty: student_faculty,
    program_study: student_program_study,
  });

  //UPDATE SUKSES DAN RESET FORM
  alert("SUCCESS");
  update_student_list();
  document.querySelector("form").reset();
});
//END AMBIL SEMUA DATA STUDENTS

//SEARCH STUDENTS BY NAME
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

      //DELETE
      let action = document.createElement("td");
      let delete_icon = `<button type="button" onclick="delete_row(this)" class="btn btn-danger">Delete</button>`;
      action.innerHTML = delete_icon;
      tr.appendChild(action);

      student_list.appendChild(tr);
    }
  }
});
//END SEARCH STUDENTS BY NAME

//FILTER BY PRODI
const filter_prodi = document.querySelector("#filter-by-prodi");
for (i of fakultas) {
  for (j of i.sub) {
    const parent = document.createElement("option");
    const child = document.createTextNode(j);
    parent.append(child);
    filter_prodi.appendChild(parent);
  }
}

const filter_prodi_button = document.querySelector("#filter-prodi-button");
filter_prodi_button.addEventListener("click", () => {
  const selected_prodi = filter_prodi.options[filter_prodi.selectedIndex].value;

  //UPDATE LIST
  if (selected_prodi == "SELECT PROGRAM STUDY") {
    update_student_list();
  } else {
    student_list.innerHTML = "";

    //FILTER STUDENT
    const filtered_students = students.filter((a) => {
      return a.program_study == selected_prodi;
      console.log(a.faculty);
    });

    for (student of filtered_students) {
      let tr = document.createElement("tr");
      for (key in student) {
        let td = document.createElement("td");
        td.appendChild(document.createTextNode(student[key]));
        tr.appendChild(td);
      }

      //DELETE
      let action = document.createElement("td");
      let delete_icon = `<button type="button" onclick="delete_row(this)" class="btn btn-danger">Delete</button>`;
      action.innerHTML = delete_icon;
      tr.appendChild(action);

      student_list.appendChild(tr);
    }
  }
});

//FILTER BY FACULTY
const filter_by_faculty = document.querySelector("#filter-by-faculty");

for (i of fakultas) {
  const parent = document.createElement("option");
  const child = document.createTextNode(i.name);
  parent.append(child);
  filter_by_faculty.appendChild(parent);
}

const filter_faculty_button = document.querySelector("#filter-faculty-button");

filter_faculty_button.addEventListener("click", () => {
  const selected_faculty =
    filter_by_faculty.options[filter_by_faculty.selectedIndex].value;

  //UPDATE LIST
  if (selected_faculty == "SELECT FACULTY") {
    update_student_list();
  } else {
    student_list.innerHTML = "";

    //FILTER STUDENT
    const filtered_students = students.filter((s) => {
      return s.faculty == selected_faculty;
      console.log(s.faculty);
    });

    for (student of filtered_students) {
      let tr = document.createElement("tr");

      for (key in student) {
        let td = document.createElement("td");
        td.appendChild(document.createTextNode(student[key]));

        tr.appendChild(td);
      }

      //delete
      let action = document.createElement("td");
      let delete_icon = `<button type="button" onclick="delete_row(this)" class="btn btn-danger">Delete</button>`;
      action.innerHTML = delete_icon;
      tr.appendChild(action);

      student_list.appendChild(tr);
    }
  }
});
//END OF STUDENTS FILTER

//TAMPILKAN SEMUA STUDENTS
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

    let action = document.createElement("td");
    let trash_icon = `<button type="button" onclick="delete_row(this)" class="btn btn-danger">Delete</button>`;
    action.innerHTML = trash_icon;
    tr.appendChild(action);

    student_list.appendChild(tr);
  }
}
update_student_list();
//END TAMPILKAN SEMUA STUDENTS

//HAPUS BARIS
function delete_row(buttn) {
  var row = buttn.parentNode.parentNode;

  student_nim = row.querySelector("tr td").textContent;
  const delete_confir = confirm(`ARE YOU SURE TO DELETE THIS STUDENT ?`);

  if (delete_confir == true) {
    students = students.filter((s) => {
      return s.nim != student_nim;
    });
  }
  update_student_list();

  //RESET FORM
  document.querySelector("#student-form-search").reset();
}
//END HAPUS BARIS
