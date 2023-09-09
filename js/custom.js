// Modal JS code
var modalId = document.getElementById("modalId");

modalId.addEventListener("show.bs.modal", function (event) {
  // Button that triggered the modal
  let button = event.relatedTarget;
  // Extract info from data-bs-* attributes
  let recipient = button.getAttribute("data-bs-whatever");

  // Use above variables to manipulate the DOM
});

$(document).ready(function () {
  // Fetch All Records
  function loadTable() {
    $("#tbody").html("");
    $.ajax({
      type: "GET",
      url: "http://localhost/PHPP/REST%20API/api-fetch-all.php",
      success: function (response) {
        if (response.status == false) {
          $("#tbody").append(
            `<tr><td colspan='6'><h2>${response.message}</h2></td></tr>`
          );
        } else {
          $.each(response, function (indexInArray, value) {
            $("#tbody").append(`<tr>
                    <td>${value.id}</td>
                    <td>${value.name}</td>
                    <td>${value.age}</td>
                    <td>${value.city}</td>
                    <td width="80px"><button type="button" class="btn btn-success edit-btn" id="${value.id}" data-bs-toggle="modal"
                    data-bs-target="#modalId">Edit
                    </button></td>
                    <td width="80px"><button type="button" class="btn btn-danger delete-btn" id="${value.id}">Delete
                    </button></td>
                 </tr>`);
          });
        }
      },
    });
  }

  loadTable();

  // Success and Error message
  function message(message, status) {
    if (status == true) {
      $("#success-message").html(message).slideDown();
      $("#error-message").slideUp();
      setTimeout(function () {
        $("#success-message").slideUp();
      }, 4000);
    } else if (status == false) {
      $("#error-message").html(message).slideDown();
      $("#success-message").slideUp();
      setTimeout(function () {
        $("#error-message").slideUp();
      }, 4000);
    }
  }

  //   Function JS array to JSON Data Convert
  function jsonData(targetForm) {
    var arr = $(targetForm).serializeArray();
    var obj = {};

    for (let a = 0; a < arr.length; a++) {
      if (arr[a].value == "") {
        return false;
      } else {
        obj[arr[a].name] = arr[a].value;
      }
    }

    var json_string = JSON.stringify(obj);

    return json_string;
  }

  // Fetch Single Record
  $(document).on("click", ".edit-btn", function () {
    var studentID = $(this).attr("id");
    var obj = { sid: studentID };
    var myJSON = JSON.stringify(obj);

    $.ajax({
      type: "POST",
      url: "http://localhost/PHPP/REST%20API/api-fetch-single.php",
      data: myJSON,
      success: function (result) {
        $("#sid").val(result[0].id);
        $("#sname").val(result[0].name);
        $("#sage").val(result[0].age);
        $("#scity").val(result[0].city);
      },
    });
  });

  // Insert New Record
  $("#save-btn").on("click", function (e) {
    e.preventDefault();

    var json_object = jsonData("#add-form-data");

    if (json_object == false) {
      message("All fields are required", false);
    } else {
      $.ajax({
        type: "POST",
        url: "http://localhost/PHPP/REST%20API/api-insert.php",
        data: json_object,
        dataType: "JSON",
        success: function (response) {
          message(response.message, response.status);

          if (response.status == true) {
            loadTable();

            $("#add-form-data").trigger("reset");
          }
        },
      });
    }
  });

  // Update Record
  $("#modal-update-button").on("click", function (e) {
    e.preventDefault();

    var json_object = jsonData("#modal-update-form");

    if (json_object == false) {
      message("All fields are required", false);
    } else {
      $.ajax({
        type: "PUT",
        url: "http://localhost/PHPP/REST%20API/api-update.php",
        data: json_object,
        success: function (response) {
          message(response.message, response.status);

          if (response.status == true) {
            loadTable();
          }
        },
      });
    }
  });

  // Delete Record
  $(document).on("click", ".delete-btn", function () {
    if (confirm("Are you sure you want to delete?")) {
      var delete_btn_id = $(this).attr("id");
      var delete_btn_id_obj = { sid: delete_btn_id };
      var delete_btn_json = JSON.stringify(delete_btn_id_obj);
      var row = this;

      $.ajax({
        type: "POST",
        url: "http://localhost/PHPP/REST%20API/api-delete.php",
        data: delete_btn_json,
        success: function (response) {
          message(response.message, response.status);

          if (response.status == true) {
            $(row).closest("tr").fadeOut();
          }
        },
      });
    }
  });

  // Live Search Record
  $("#search-form").keyup(function () {
    var search_val = $(this).val();
    $("#tbody").html("");

    $.ajax({
      type: "GET",
      url:
        "http://localhost/PHPP/REST%20API/api-search.php?search=" + search_val,
      success: function (response) {
        if (response.status == false) {
          $("#tbody").append(
            `<tr><td colspan='6'><h2>${response.message}</h2></td></tr>`
          );
        } else {
          $.each(response, function (indexInArray, value) {
            $("#tbody").append(`<tr>
                    <td>${value.id}</td>
                    <td>${value.name}</td>
                    <td>${value.age}</td>
                    <td>${value.city}</td>
                    <td width="80px"><button type="button" class="btn btn-success edit-btn" id="${value.id}" data-bs-toggle="modal"
                    data-bs-target="#modalId">Edit
                    </button></td>
                    <td width="80px"><button type="button" class="btn btn-danger delete-btn" id="${value.id}">Delete
                    </button></td>
                 </tr>`);
          });
        }
      },
    });
  });
});
