(function(global, factory) {
	"use strict";
	//---------------------------------//
	// Validate Login, CreateUser, EditProfile, ChangePassword Form
	//---------------------------------//
	$("#app-form").submit(function(e) {
		var errorMessage = $(".form-error-message");

		var fields = [
			{
				elem: $("#nickname-field"),
				text: "Nickname"
			},
			{
				elem: $("#username-field"),
				text: "Username"
			},
			{
				elem: $("#old-password-field"),
				text: "Old Password"
			},
			{
				elem: $("#password-field"),
				text: "Password"
			},
			{
				elem: $("#confirm-field"),
				text: "Confirm Password"
			},
			{
				elem: $("#role-field"),
				text: "Role"
			}
		];

		for (var i = 0; i < fields.length; i++) {
			if (!fields[i].elem.length) {
				continue;
			} else if (!fields[i].elem.val()) {
				e.preventDefault();
				fields[i].elem.focus();
				errorMessage.text(fields[i].text + " is empty!");
				break;
			}
		}

		if (fields[3].elem.length && fields[4].elem.length) {
			if (fields[3].elem.val().length !== 0 && fields[3].elem.val().length < 6) {
				e.preventDefault();
				errorMessage.text("Password must be more than 5 character long!");
				fields[3].elem.focus();
			} else if (fields[3].elem.val() !== fields[4].elem.val()) {
				e.preventDefault();
				errorMessage.text("Password doesn't match!");
				fields[4].elem.focus();
			}
		}
	});
	//---------------------------------//
	// Ajax Delete Single User Btn
	//---------------------------------//
	$(".del-user-btn").click(function() {
		var username = $(this).attr("data-username");
		var feedback = confirm("Are you sure? Delete user " + username);
		if (!feedback) return;
		$(this).attr("disabled", true);
		$("[data-edit=" + username + "]").attr("disabled", true);
		$.ajax({
			url: "/deleteuser",
			data: {
				username: username
			},
			type: "delete",
			error: function() {
				alert("Something when wrong! I can't delete user");
				location.reload();
			},
			success: function(result) {
				if (result) {
					alert("User " + username + " had been deleted");
					location.reload();
				} else {
					alert("Error: please ask developer to fix it!");
				}
			}
		});
	});
	//---------------------------------//
	// "Select User Checkbox" Function / User List Page
	//---------------------------------//
	$("#select-all-user-checkbox").change(function() {
		if (this.checked) {
			$(".user-checkbox").prop("checked", true);
		} else {
			$(".user-checkbox").prop("checked", false);
		}
	});
	//---------------------------------//
	// "Delete Selected Users Btn" Function / User List Page
	//---------------------------------//
	$("#delete-selected-user").click(function() {
		var checkedUser = [];
		var confirmDel;
		$(".user-checkbox").each(function() {
			if (this.checked) {
				checkedUser.push($(this).attr("data-username"));
			}
		});
		if (checkedUser.length) {
			confirmDel = confirm("Are you sure for delete all of selected users?");
		} else {
			alert("There is no selected users!");
		}

		if (confirmDel) {
			$.ajax({
				url: "/deleteusers",
				data: {
					username: JSON.stringify(checkedUser)
				},
				type: "delete",
				error: function() {
					alert("Something when wrong! I can't delete user");
					location.reload();
				},
				success: function(result) {
					if (result) {
						alert("All selected users had been deleted!");
						location.reload();
					} else {
						alert("Error: please ask developer to fix it!");
					}
				}
			});
		}
	});
	//---------------------------------//
	// Date Picker / Check In Page
	//---------------------------------//
	var datepicker = $("#datepicker");
	if (datepicker.length) {
		datepicker.datepicker({
			showButtonPanel: true,
			minDate: 0
		});
	}
	//---------------------------------//
	// Validate Check In Form / Check In Page
	//---------------------------------//
	function checkIfInputIsEmpty(elem, label, errElem) {
		if (!elem.val()) {
			elem.focus();
			errElem.text(label + " is empty!");

			return true;
		}

		return false;
	}

	function checkNotEmptyInput(elem) {
		if (elem.length && elem.val() !== "") {
			return true;
		}

		return false;
	}

	$("#check-in-form").submit(function(e) {
		var errElem = $("#check-in-form .form-error-message");
		var roomNumber = $("#check-in-form #room-number");
		var name = $("#check-in-form #name");
		var id = $("#check-in-form #national-id");
		var datepicker = $("#check-in-form #datepicker");
		var hours = $("#check-in-form #hours");
		var price = $("#check-in-form #price");
		var pay = $("#check-in-form #pay");
		var nameRegex = /[^a-z0-9 ]/i;
		var idRegex = /[0-9]{9}/;

		if (checkNotEmptyInput(name) && /^ /.test(name.val())) {
			errElem.text("First character of name can't be whitespace!");
			e.preventDefault();
		} else if (checkNotEmptyInput(name) !== "" && nameRegex.test(name.val())) {
			errElem.text("Name but be a-z A-Z 0-9 and whilespace only!");
			e.preventDefault();
		} else if (checkIfInputIsEmpty(roomNumber, "Room Number", errElem)) {
			e.preventDefault();
		} else if (checkNotEmptyInput(id) && !idRegex.test(id.val())) {
			errElem.text("National Id must be number and 9 character long!");
			e.preventDefault();
		} else if (checkNotEmptyInput(id) && id.val().length > 9) {
			errElem.text("National Id must be number and 9 character long!");
			e.preventDefault();
		} else if (checkIfInputIsEmpty(datepicker, "Total Days", errElem)) {
			e.preventDefault();
		} else if (checkIfInputIsEmpty(hours, "Total Hours", errElem)) {
			e.preventDefault();
		} else if (checkIfInputIsEmpty(price, "Price", errElem)) {
			e.preventDefault();
		} else if (checkIfInputIsEmpty(pay, "Pay", errElem)) {
			e.preventDefault();
		} else {
		}
	});
})(window, document);
