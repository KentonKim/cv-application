const personalPromptData= [
  {
    id: "name",
    label: "Name: ",
    example: "John Smith",
    isRequired: true,
  },
  { 
    id: "email",
    label: "Email: ",
    example: "JohnSmith@gmail.com",
    type: "email",
    isRequired: true,
  },
  { 
    id: "phone",
    label: "Phone Number: ",
    example: "###-###-####",
    type: "tel",
    isRequired: true,
  }
]

const schoolPromptData = [
  {
    id: "school",
    label: "School: ",
    example: "University of College",
  },
  { 
    id: "start-date",
    label: "Start Date: ",
    type: "date"
  },
  { 
    id: "end-date",
    label: "End Date: ",
    type: "date"
  },
  { 
    id: "degree",
    label: "Degree: ",
    example: "Bachelors of science"
  },
  { 
    id: "study",
    label: "Area of Study:",
    example: "Basket Weaving"
  }
]

const workPromptData = [
  { 
    id: "company",
    label: "Company: ",
    example: "Company co.",
  },
  {
    id: "position",
    label: "Position: ",
    example: "Worker",
  },
  { 
    id: "location",
    label: "Location: ",
    example: "City, State",
  },
  { 
    id: "start-date",
    label: "Start Date: ",
    type: "date"
  },
  { 
    id: "end-date",
    label: "End Date: ",
    type: "date"
  },   
  { 
    id: "description1",
    label: "Description: ",
    example: "",
    isLongResponse: true
  },
  { 
    id: "description2",
    label: "Description: ",
    example: "",
    isLongResponse: true
  },
  { 
    id: "description3",
    label: "Description: ",
    example: "",
    isLongResponse: true
  }
]

const projectsPromptData = [
  {
    id: "project-name",
    label: "Project Name: ",
  },
  { 
    id: "start-date",
    label: "Start Date: ",
    type: "date"
  },
  { 
    id: "end-date",
    label: "End Date: ",
    type: "date"
  },
  { 
    id: "description1",
    label: "Description: ",
    example: "",
  },
  { 
    id: "description2",
    label: "Description: ",
    example: "",
  }
]

const skillsPromptData = [
  {
    id: "skill1",
    label: "Skill: ",
  },
  { 
    id: "skill2",
    label: "Skill: ",
  },
  { 
    id: "skill3",
    label: "Skill: ",
  }
]

export {personalPromptData, schoolPromptData, workPromptData, projectsPromptData, skillsPromptData}
