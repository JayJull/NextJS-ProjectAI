interface JobType {
    styleClass: string;
    type: string;
  }
  
  interface Destination {
    min: number;
    max: number;
  }
  
  interface TotalSalary {
    min: number;
    max: number;
  }
  
  interface Job {
    id: number;
    logo: string;
    jobTitle: string;
    company: string;
    location: string;
    time: string;
    salary: string;
    jobType: JobType[];
    link: string;
    tag: string;
    destination: Destination;
    category: string;
    created_at: string;
    experience: string;
    totalSalary: TotalSalary;
  }
  
  const jobs: Job[] = [
    {
      id: 1,
      logo: "/images/resource/company-logo/1-1.png",
      jobTitle: "Software Engineer (Android), Libraries",
      company: "Segment",
      location: "London, UK",
      time: "11 hours ago",
      salary: "$35k - $45k",
      jobType: [
        { styleClass: "time", type: "Full Time" },
        { styleClass: "privacy", type: "Private" },
        { styleClass: "required", type: "Urgent" },
      ],
      link: "https://segment.com",
      tag: "freelancer",
      destination: { min: 0, max: 20 },
      category: "Residential",
      created_at: "Last Hour",
      experience: "Fresh",
      totalSalary: { min: 0, max: 500 },
    },
    {
      id: 2,
      logo: "/images/resource/company-logo/1-2.png",
      jobTitle: "Recruiting Coordinator",
      company: "Catalyst",
      location: "London, UK",
      time: "11 hours ago",
      salary: "$35k - $45k",
      jobType: [
        { styleClass: "time", type: "Freelancer" },
        { styleClass: "privacy", type: "Private" },
        { styleClass: "required", type: "Urgent" },
      ],
      link: "https://www.catalyst.org",
      tag: "full-time",
      destination: { min: 20, max: 30 },
      category: "Commercial",
      created_at: "Last 24 Hour",
      experience: "1 Year",
      totalSalary: { min: 500, max: 1000 },
    },
    {
      id: 3,
      logo: "/images/resource/company-logo/1-3.png",
      jobTitle: "Product Manager, Studio",
      company: "Invision",
      location: "London, UK",
      time: "11 hours ago",
      salary: "$35k - $45k",
      jobType: [
        { styleClass: "time", type: "Part Time" },
        { styleClass: "privacy", type: "Private" },
        { styleClass: "required", type: "Urgent" },
      ],
      link: "https://www.invisionapp.com",
      tag: "internship",
      destination: { min: 20, max: 30 },
      category: "Industrial",
      created_at: "Last 7 Days",
      experience: "2 Year",
      totalSalary: { min: 1000, max: 1500 },
    },
    {
      id: 4,
      logo: "/images/resource/company-logo/1-4.png",
      jobTitle: "Senior Product Designer",
      company: "Upwork",
      location: "London, UK",
      time: "11 hours ago",
      salary: "$35k - $45k",
      jobType: [
        { styleClass: "time", type: "Temporary" },
        { styleClass: "privacy", type: "Private" },
        { styleClass: "required", type: "Urgent" },
      ],
      link: "https://www.upwork.com",
      tag: "freelancer",
      destination: { min: 30, max: 40 },
      category: "Apartments",
      created_at: "Last 14 Days",
      experience: "3 Year",
      totalSalary: { min: 1500, max: 2000 },
    },
    {
      id: 5,
      logo: "/images/resource/company-logo/1-5.png",
      jobTitle: "Senior Full Stack Engineer, Creator Success",
      company: "Medium",
      location: "London, UK",
      time: "11 hours ago",
      salary: "$35k - $45k",
      jobType: [
        { styleClass: "time", type: "Full Time" },
        { styleClass: "privacy", type: "Private" },
        { styleClass: "required", type: "Urgent" },
      ],
      link: "https://medium.com",
      tag: "full-time",
      destination: { min: 40, max: 50 },
      category: "Residential",
      created_at: "Last 30 Days",
      experience: "4 Year",
      totalSalary: { min: 2000, max: 2500 },
    },
  ];
  
  export default jobs;
  