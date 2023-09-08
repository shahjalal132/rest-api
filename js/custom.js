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
                    <td width="80px"><button type="button" class="btn btn-danger" id="delete-btn">Delete
                    </button></td>
                 </tr>`);
          });
        }
      },
    });
  }

  loadTable();

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
        $("#sname").val(result[0].name);
        $("#sage").val(result[0].age);
        $("#scity").val(result[0].city);
      },
    });
  });

  // Insert New Record
  // Update Record
  // Live Search Record
});
