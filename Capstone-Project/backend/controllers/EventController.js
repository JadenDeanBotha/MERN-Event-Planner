const eventSchema = require("../Model/EventsModal");

//This is the function which will allow the admin user to add an event
const addEvent = async (req, res) => {
  try {
    const event = await eventSchema.create({
      title: req.body.title,
      description: req.body.description,
      company: req.body.company,
      date: req.body.date,
      childFriendly: req.body.childFriendly,
    });

    const allEvents = await eventSchema.find();

    res.status(200).json(["Event added", allEvents]);
    console.log(allEvents);
  } catch (error) {
    console.log([error, ""]);
    res.send([error, ""]);
  }
};

//This is the function which will allow the admin user to delete an event
const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;

    const event = await eventSchema.findOneAndDelete({ _id: id });
    const allEvents = await eventSchema.find();
    console.log(event);
    res.status(200).json(["Item deleted", allEvents]);
  } catch (error) {
    res.send([error, ""]);
  }
};

//This is the function that will get all of the events
const getEvents = async (req, res) => {
  try {
    const events = await eventSchema.find();
    res.status(200).send([events, ""]);
    console.log(events.status);
  } catch (error) {
    res.send([error, ""]);
  }
};

//this is the function that will allow the admin user to edit events
const updateEvent = async (req, res) => {
  const { title, description, company, date, childFriendly } = req.body;

  const id = req.params.id;

  try {
    const event = await eventSchema.findOneAndUpdate(
      {
        _id: id,
      },

      {
        $set: {
          title: title,
          description: description,
          company: company,
          date: date,
          childFriendly: childFriendly,
        },
      },
      {
        new: true,
      }
    );
    console.log(title);
    console.log(description);
    console.log(company);
    console.log(date);
    console.log(childFriendly);
    const allEvents = await eventSchema.find();
    res.json(["", allEvents]);
  } catch (error) {
    res.send([error, ""]);
  }
};

module.exports = { addEvent, deleteEvent, getEvents, updateEvent };
