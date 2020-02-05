// Actives Room Collection
{
	room: 101,
	name: "Ta Ploy",	// editable
	nationalid: 020874758,	// editable
	phone: 069987826,	// editable
	person: 3,	// editable
	checkin: {
		date: "01/07/2019",
		time: "7:00AM"
	},
	expire: {	// editable
		date: "02/07/2019",
		time: "12:00PM"
	},
	checkout: {
		date: null,
		time: null
	},
	price: "8$",	// editable
	pay: "no",	// editable
	checkinby: "sankimtin",
	editlog: [{
		editby: "sanvisal",
		date: "02/07/2019",
		time: "4:00AM",
		beforeedit: {
			name: "Ta Yoy",
			nationalid: "202020202"
		}
	}]
}
// Reports Collection
{
	room: 101,
	name: "Ta Ploy",
	nationalid: 020874758,
	phone: 069987826,
	person: 3,
	checkin: {
		date: "01/07/2019",
		time: "7:00AM"
	},
	expire: {
		date: "02/07/2019",
		time: "12:00PM"
	},
	checkout: {
		date: "02/07/2019",
		time: "8:00AM"
	},
	price: "8$",
	pay: "yes",
	checkinby: "sankimtin",
	editlog: [{
		editby: "sanvisal",
		date: "02/07/2019",
		time: "4:00AM",
		beforeedit: {
			name: "Ta Yoy",
			nationalid: "202020202"
		}
	}]
}
// books collection
{
	room: 101,
	from: {
		date: "",
		time: ""
	},
	expire: {
		date: "",
		time: ""
	},
	password: "",
	editlog: [{
		from: {
			date: "",
			time: ""
		}
	}]
}

// Users Collection
{
	username: "sankimtin", // editable
	nickname: "Tin",	// editable
	password: "koko1304", // hash password
	role: "superuser" // have three state "stuff", "admin", "superuser",
	editlog: [{
		date: "",
		time: "",
		beforeedit: {
			username: "",
			nickname: "",
		}
	}]
}