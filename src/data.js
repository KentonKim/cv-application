const personalData = [
    {
        id: "name",
        label: "Name: ",
        example: "John Smith",
    },
    { 
        id: "email",
        label: "Email: ",
        example: "JohnSmith@gmail.com",
        type: "email"
    },
    { 
        id: "phone",
        label: "Phone Number: ",
        example: "###-###-####",
        type: "tel"
    }
]

const schoolData = [
    {
        id: "school",
        label: "School: ",
        example: "University of Colorado",
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
        example: "Civil Engineering"
    }
]

const workData = [
    {
        id: "position",
        label: "Position: ",
        example: "Assistant Manager",
    },
    { 
        id: "company",
        label: "Company: ",
        example: "Panera Bread",
    },
    { 
        id: "location",
        label: "Location: ",
        example: "Lakewood, California",
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
    },
    { 
        id: "description3",
        label: "Description: ",
        example: "",
    }
]

const projectsData = [
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

const skillsData = [
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

export {personalData, schoolData, workData, projectsData, skillsData}
