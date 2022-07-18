const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {

    site: {
      address: {
        type: String,
        // required: [true, 'Please include the site of your project'],
      },
      location: {
        type: { type: String },
        coordinates: [Number],
      },
    },

    projectType: {
      type: [String],
      enum: ['FARM', 'NGO', 'SCHOOL', 'HOSTEL', 'CAMPING', 'OTHER'],
      required: [true, 'Please include the project type'],
    },

    hoursPerWeek: {
      type: Number,
      max: [40, 'You must specify about the number of working hours per week'],
      required: [true, 'Please indicate how many hours per week volunteers are expected to work'],
    },

    description: {
      type: String,
      maxLength: 400,
      required: [true, 'Please include a description of the project and help needed'],
    },

    minWeeks: {
      type: Number,
      min: 1,
      default: 1,
    },

    mealsIncluded: {
      type: [String],
      enum: ['Breakfast', 'Lunch', 'Supper'],
      required: [true, 'Please indicate what meals are provided to volunteers'],
    },

    joiners: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],

    shelterType: {
      type: String
    },

    testimonials: {
      type: Schema.Types.ObjectId,
      ref: 'Rating',
    },

    gallery: {
      type: [String],
      default: ['https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1362px-Placeholder_view_vector.svg.png?20220519031949'],
    },

    languagesSpoken: {
      type: [String],
      required: [true, 'Please indicate what languages are spoken by the hosts']
    }

  },
  {
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);

module.exports = Project;