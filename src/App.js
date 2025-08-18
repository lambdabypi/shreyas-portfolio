import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MapPin, Book, Award, Database, BrainCircuit, LineChart, MessageSquare, Send } from 'lucide-react';

export default function Portfolio() {
  const [isStarted, setIsStarted] = useState(false);
  const [activeAgent, setActiveAgent] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', message: 'Hi there! I\'m Shreyas\'s portfolio assistant. How can I help you learn about his work?' }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [typedIntro, setTypedIntro] = useState('');
  const [currentSection, setCurrentSection] = useState('map');
  const [isLoading, setIsLoading] = useState(true);

  // Typing effect for intro text
  useEffect(() => {
    if (!isStarted) {
      const introText = "WELCOME TO SHREYAS SREENIVAS'S INTERACTIVE PORTFOLIO";
      let i = 0;
      const typing = setInterval(() => {
        setTypedIntro(introText.substring(0, i));
        i++;
        if (i > introText.length) clearInterval(typing);
      }, 80);
      return () => clearInterval(typing);
    }
  }, [isStarted]);

  // Simulate loading
  useEffect(() => {
    if (isStarted) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }, [isStarted]);

  // Agents data
  const agents = [
    {
      id: 'data-scientist',
      name: 'Data Scientist',
      icon: <Database className="h-6 w-6" />,
      color: 'bg-blue-500',
      description: 'Specializes in data analytics and visualization',
      skills: ['Python', 'SQL', 'TensorFlow', 'PyTorch', 'scikit-learn', 'Pandas']
    },
    {
      id: 'ai-developer',
      name: 'AI Developer',
      icon: <BrainCircuit className="h-6 w-6" />,
      color: 'bg-purple-500',
      description: 'Builds AI-powered applications and frameworks',
      skills: ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'LLMs', 'Chatbots']
    },
    {
      id: 'cloud-architect',
      name: 'Cloud Architect',
      icon: <LineChart className="h-6 w-6" />,
      color: 'bg-green-500',
      description: 'Designs and implements cloud solutions',
      skills: ['AWS', 'Docker', 'FastAPI', 'CI/CD', 'PostgreSQL', 'JWT Authentication']
    },
    {
      id: 'fintech-specialist',
      name: 'FinTech Specialist',
      icon: <Award className="h-6 w-6" />,
      color: 'bg-yellow-500',
      description: 'Creates secure financial platforms',
      skills: ['REST API', 'Financial Analysis', 'Plaid API', 'React', 'GDPR Compliance']
    }
  ];

  // Experience data for the map
  const experiences = [
    {
      id: 'northeastern',
      title: 'MS in Data Analytics Engineering',
      location: 'Northeastern University',
      period: 'Sept 2023 – Dec 2025',
      x: 15,
      y: 20,
      color: 'bg-indigo-400',
      size: 'w-24 h-24',
      type: 'education'
    },
    {
      id: 'bmsit',
      title: 'BE in AI and ML',
      location: 'BMSIT&M',
      period: 'Aug 2019 – May 2023',
      x: 5,
      y: 40,
      color: 'bg-indigo-300',
      size: 'w-20 h-20',
      type: 'education'
    },
    {
      id: 'idw',
      title: 'Data Engineer & AI Developer',
      location: 'Intelligent DataWorks',
      period: 'Jan 2025 – Present',
      x: 45,
      y: 15,
      color: 'bg-blue-500',
      size: 'w-28 h-28',
      type: 'work'
    },
    {
      id: 'clau',
      title: 'Co-Founder and Lead Developer',
      location: 'Clau API, Vivytech',
      period: 'May 2024 – Present',
      x: 70,
      y: 30,
      color: 'bg-green-500',
      size: 'w-28 h-28',
      type: 'work'
    },
    {
      id: 'chipmonk',
      title: 'AI Engineer',
      location: 'Chipmonk Technologies',
      period: 'Sept 2022 – Aug 2023',
      x: 30,
      y: 50,
      color: 'bg-purple-500',
      size: 'w-24 h-24',
      type: 'work'
    },
    {
      id: 'medical-ai',
      title: 'Medical Multi-Agent Framework',
      location: 'Project',
      period: 'Sept 2024 – Dec 2024',
      x: 55,
      y: 60,
      color: 'bg-red-400',
      size: 'w-22 h-22',
      type: 'project'
    },
    {
      id: 'video-classifier',
      title: 'Multimodal Video Ad Classifier',
      location: 'Project',
      period: 'Jun 2024',
      x: 80,
      y: 70,
      color: 'bg-orange-400',
      size: 'w-20 h-20',
      type: 'project'
    },
    {
      id: 'glioma',
      title: 'ML-based Glioma Classification',
      location: 'Project',
      period: 'Feb 2024 - April 2024',
      x: 85,
      y: 45,
      color: 'bg-yellow-400',
      size: 'w-20 h-20',
      type: 'project'
    }
  ];

  // Projects data
  const projects = [
    {
      id: 'medical-ai',
      title: 'Aligning AI with Medical Expertise: A Multi-Agent Framework',
      period: 'Sept 2024 – Dec 2024',
      description: 'Developed a multi-agent framework using Python, PyTorch and Langchain that integrates general-purpose and fine-tuned LLMs with critique mechanisms. Fine-tuned Phi 3.5 Mini using Unsloth and conducted comprehensive data analysis across medical specialties, achieving improved diagnostic accuracy and 92% alignment with requirements of healthcare expertise.',
      technologies: ['Python', 'PyTorch', 'Langchain', 'Phi 3.5 Mini', 'Unsloth'],
      metrics: [
        { label: 'Alignment Rate', value: 92, unit: '%' },
        { label: 'Diagnostic Accuracy', value: 88, unit: '%' },
        { label: 'Specialties Covered', value: 8, unit: '' }
      ]
    },
    {
      id: 'video-classifier',
      title: 'Multimodal Video Ad Classifier',
      period: 'Jun 2024',
      description: 'Built a multimodal LLM classifier using Python, TensorFlow and OpenCV that analyzes 150 video ads through video frames, text descriptions, and transcriptions. The system achieved 81.43% agreement with human coders, exceptional performance in branding elements (F1 = 0.88) and emotional intent (F1 = 0.81), and identified improvements for narrative features (F1 = 0.56).',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'LLMs', 'Video Analysis'],
      metrics: [
        { label: 'Human Agreement', value: 81.43, unit: '%' },
        { label: 'Branding F1 Score', value: 0.88, unit: '' },
        { label: 'Emotional Intent F1', value: 0.81, unit: '' }
      ]
    },
    {
      id: 'glioma',
      title: 'Classification of ML-based glioma',
      period: 'Feb 2024 - April 2024',
      description: 'Created a medical diagnostic tool using Python, scikit-learn and Pandas that classifies glioma patients as LGG or GBM from 862 patient records. The system evaluated multiple algorithms including Logistic Regression, SVM, Random Forest, and achieved 99% accuracy with k-NN and Multinomial Naive Bayes, delivering exceptional performance for potential clinical applications.',
      technologies: ['Python', 'scikit-learn', 'Pandas', 'k-NN', 'Naive Bayes'],
      metrics: [
        { label: 'Accuracy', value: 99, unit: '%' },
        { label: 'Patient Records', value: 862, unit: '' },
        { label: 'Algorithms Tested', value: 5, unit: '' }
      ]
    }
  ];

  // Experience details
  const experienceDetails = {
    'idw': {
      title: 'Data Engineer & AI Developer',
      company: 'Intelligent DataWorks',
      period: 'Jan 2025 – Present',
      achievements: [
        'Architected HR management platform integrating job operations, applicant tracking, applicant management, jobs management using REST API, FastAPI, and PostgreSQL with Pydantic, improving system architecture by 30%.',
        'Engineered authentication framework with JWT tokens, bcrypt password hashing, and AWS SES for email verification to implement persistent sessions and role-based access control, enhancing security while improving user experience.',
        'Developed HR workflows in Python, Streamlit and PostgreSQL by creating interactive dashboards and implementing AI algorithms to enable data-driven hiring decisions and automated candidate evaluation.'
      ],
      skills: ['Python', 'FastAPI', 'PostgreSQL', 'JWT', 'AWS SES', 'Streamlit', 'AI Algorithms']
    },
    'clau': {
      title: 'Co-Founder and Lead Developer',
      company: 'Clau API, Vivytech',
      period: 'May 2024 – Present',
      achievements: [
        'Architected financial platform using REST API, JWT authentication, and 2FA via TOTP on AWS EC2 to establish secure bank connectivity, delivering highly secure operations with personalized financial analytics.',
        'Developed financial analysis engine using Cohere-powered AI with specialized prompt engineering and Plaid API integration to create complete credential management system, enabling real-time transaction updates and tailored strategies.',
        'Engineered technical infrastructure with React dashboard and GDPR-compliant data management by implementing interactive visualizations and role-based access control, improving user experience while ensuring regulatory compliance.'
      ],
      skills: ['REST API', 'JWT', '2FA', 'AWS EC2', 'Cohere AI', 'Plaid API', 'React', 'GDPR']
    },
    'chipmonk': {
      title: 'AI Engineer',
      company: 'Chipmonk Technologies Pvt. Ltd.',
      period: 'Sept 2022 – Aug 2023',
      achievements: [
        'Engineered machine-learning model using linear regression to detect tolerance lines from video feeds, enhancing real-time tracking precision by 30% and streamlining construction data analysis by 35%.',
        'Constructed MySQL database for storing coordinate data and construction metrics by designing efficient data schemas, improving processing time by 25% and facilitating accurate multi-site project tracking.',
        'Built CICD pipeline with TeamCity to automate and analyze testing processes, increasing developer productivity by 30% while ensuring consistent software quality across deployments.'
      ],
      skills: ['Machine Learning', 'Linear Regression', 'Video Analysis', 'MySQL', 'TeamCity', 'CICD']
    }
  };

  // Skill levels for visualization
  const skillLevels = {
    'Python': 95,
    'JavaScript': 85,
    'SQL': 90,
    'React': 80,
    'Node.js': 75,
    'FastAPI': 90,
    'Docker': 85,
    'AWS': 80,
    'Git': 90,
    'TensorFlow': 85,
    'PyTorch': 80,
    'scikit-learn': 90,
    'Machine Learning': 90,
    'Natural Language Processing': 85,
    'Computer Vision': 80,
    'Data Engineering': 90,
    'Database Design': 85,
    'API Development': 90,
    'Cloud Computing': 80
  };

  // Chat bot interaction
  const handleChatSubmit = () => {
    if (!userMessage.trim()) return;

    // Add user message
    setChatMessages([...chatMessages, { sender: 'user', message: userMessage }]);

    // Simulate bot response (would be more sophisticated in real implementation)
    setTimeout(() => {
      let botResponse = "I'm still learning about Shreyas's portfolio. Can you ask something about his projects or experience?";

      const lowerMsg = userMessage.toLowerCase();
      if (lowerMsg.includes('project') || lowerMsg.includes('work')) {
        botResponse = "Shreyas has worked on several interesting projects including a Medical Multi-Agent Framework and a Multimodal Video Ad Classifier. Which one would you like to know more about?";
      } else if (lowerMsg.includes('experience') || lowerMsg.includes('job')) {
        botResponse = "Shreyas has experience as a Data Engineer & AI Developer at Intelligent DataWorks and as a Co-Founder at Clau API. He also worked as an AI Engineer at Chipmonk Technologies.";
      } else if (lowerMsg.includes('skill') || lowerMsg.includes('tech')) {
        botResponse = "Shreyas's top skills include Python, Machine Learning, NLP, Data Engineering, and Cloud Computing. He's also proficient with frameworks like TensorFlow, PyTorch, and FastAPI.";
      } else if (lowerMsg.includes('education') || lowerMsg.includes('study')) {
        botResponse = "Shreyas has an MS in Data Analytics Engineering from Northeastern University (2023-2025) and a BE in AI and ML from BMSIT&M (2019-2023).";
      } else if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('reach')) {
        botResponse = "You can contact Shreyas via email at shreyas.atneu@gmail.com or connect with him on LinkedIn.";
      }

      setChatMessages(prev => [...prev, { sender: 'bot', message: botResponse }]);
    }, 1000);

    setUserMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleChatSubmit();
    }
  };

  // Render sections based on current view
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          <p className="mt-4 text-blue-500 font-mono">Loading world map...</p>
        </div>
      );
    }

    switch (currentSection) {
      case 'map':
        return renderWorldMap();
      case 'skills':
        return renderSkillsTree();
      case 'projects':
        return renderProjects();
      case 'experience':
        return renderExperience();
      default:
        return renderWorldMap();
    }
  };

  // Render the interactive world map
  const renderWorldMap = () => {
    return (
      <div className="relative h-full w-full bg-gray-900 overflow-hidden rounded-lg border border-gray-700">
        {/* Decorative grid lines */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-4 opacity-20">
          {Array(12).fill().map((_, i) => (
            <div key={`col-${i}`} className="h-full w-px bg-blue-400"></div>
          ))}
          {Array(12).fill().map((_, i) => (
            <div key={`row-${i}`} className="w-full h-px bg-blue-400"></div>
          ))}
        </div>

        {/* Experience nodes */}
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className={`absolute rounded-full ${exp.color} ${exp.size} flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl`}
            style={{ left: `${exp.x}%`, top: `${exp.y}%` }}
            onClick={() => {
              if (exp.type === 'work') {
                setCurrentSection('experience');
                setActiveAgent(exp.id);
              } else if (exp.type === 'project') {
                setCurrentSection('projects');
                setActiveAgent(exp.id);
              }
            }}
          >
            <div className="text-center text-white p-2 text-xs font-bold">
              {exp.title.split(' ').map((word, i) => (
                <div key={i}>{word}</div>
              ))}
            </div>
          </div>
        ))}

        {/* Connection lines between nodes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="15%" y1="20%" x2="45%" y2="15%" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" />
          <line x1="45%" y1="15%" x2="70%" y2="30%" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" />
          <line x1="5%" y1="40%" x2="30%" y2="50%" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" />
          <line x1="30%" y1="50%" x2="15%" y2="20%" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" />
          <line x1="30%" y1="50%" x2="55%" y2="60%" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" />
          <line x1="55%" y1="60%" x2="80%" y2="70%" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" />
          <line x1="70%" y1="30%" x2="85%" y2="45%" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" />
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-gray-800 bg-opacity-70 p-2 rounded-lg text-white text-xs">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span>Work Experience</span>
          </div>
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-indigo-400 mr-2"></div>
            <span>Education</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
            <span>Projects</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-70 p-2 rounded-lg text-white text-xs max-w-xs">
          <p>Click on any node to explore Shreyas's journey. Larger nodes represent more significant experiences.</p>
        </div>
      </div>
    );
  };

  // Render skills tree visualization
  const renderSkillsTree = () => {
    return (
      <div className="h-full w-full bg-gray-900 rounded-lg border border-gray-700 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Skills & Proficiency</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Technical Skills</h3>
            {Object.entries(skillLevels)
              .filter(([key]) => !['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Data Engineering', 'Database Design', 'API Development', 'Cloud Computing'].includes(key))
              .map(([skill, level]) => (
                <div key={skill} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-white">{skill}</span>
                    <span className="text-blue-300">{level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: `${level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-purple-400 mb-4">Domain Expertise</h3>
            {Object.entries(skillLevels)
              .filter(([key]) => ['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Data Engineering', 'Database Design', 'API Development', 'Cloud Computing'].includes(key))
              .map(([skill, level]) => (
                <div key={skill} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-white">{skill}</span>
                    <span className="text-purple-300">{level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-purple-500 h-2.5 rounded-full"
                      style={{ width: `${level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Skill connections visualization */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-green-400 mb-4">Skill Relationships</h3>
          <div className="bg-gray-800 rounded-lg p-4 h-64 relative">
            {/* This would be a more complex D3 or custom visualization in a real implementation */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              Data Science
            </div>

            {/* Sample connecting nodes */}
            <div className="absolute left-1/4 top-1/3 w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
              Python
            </div>
            <div className="absolute right-1/4 top-1/3 w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
              ML
            </div>
            <div className="absolute left-1/3 bottom-1/4 w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">
              SQL
            </div>
            <div className="absolute right-1/3 bottom-1/4 w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">
              Cloud
            </div>

            {/* Connectors */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="50%" y1="50%" x2="25%" y2="33%" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="75%" y2="33%" stroke="rgba(147, 51, 234, 0.5)" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="33%" y2="75%" stroke="rgba(234, 179, 8, 0.5)" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="67%" y2="75%" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  // Render projects section
  const renderProjects = () => {
    const activeProject = activeAgent ? projects.find(p => p.id === activeAgent) : projects[0];

    return (
      <div className="h-full w-full bg-gray-900 rounded-lg border border-gray-700 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Project Achievements</h2>

        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
          {projects.map(project => (
            <button
              key={project.id}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeProject.id === project.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              onClick={() => setActiveAgent(project.id)}
            >
              {project.title.split(':')[0]}
            </button>
          ))}
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-2">{activeProject.title}</h3>
          <p className="text-blue-300 mb-4">{activeProject.period}</p>

          <p className="text-gray-300 mb-6">{activeProject.description}</p>

          <div className="mb-6">
            <h4 className="text-lg font-medium text-white mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {activeProject.technologies.map(tech => (
                <span key={tech} className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-4">Key Metrics</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeProject.metrics.map(metric => (
                <div key={metric.label} className="bg-gray-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {metric.value}{metric.unit}
                  </div>
                  <div className="text-gray-300 text-sm">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render experience section
  const renderExperience = () => {
    const activeExp = activeAgent && experienceDetails[activeAgent]
      ? experienceDetails[activeAgent]
      : experienceDetails['idw'];

    return (
      <div className="h-full w-full bg-gray-900 rounded-lg border border-gray-700 p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Work Experience</h2>

        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
          {Object.keys(experienceDetails).map(expKey => (
            <button
              key={expKey}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${activeAgent === expKey
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              onClick={() => setActiveAgent(expKey)}
            >
              {experienceDetails[expKey].company}
            </button>
          ))}
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-2">{activeExp.title}</h3>
          <div className="flex items-center text-green-300 mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{activeExp.company}</span>
            <span className="mx-2">•</span>
            <span>{activeExp.period}</span>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-medium text-white mb-2">Key Achievements</h4>
            <ul className="space-y-3">
              {activeExp.achievements.map((achievement, idx) => (
                <li key={idx} className="text-gray-300 flex">
                  <span className="text-green-400 mr-2">✦</span>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-2">Skills Applied</h4>
            <div className="flex flex-wrap gap-2">
              {activeExp.skills.map(skill => (
                <span key={skill} className="bg-green-900 text-green-200 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // If not started, show intro screen
  if (!isStarted) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-6 font-mono min-h-[60px]">
            {typedIntro}
          </h1>

          <div className="mb-8 text-gray-300">
            <p className="text-lg">Data Scientist • AI Developer • Cloud Architect</p>
          </div>

          <div className="mb-10 grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setIsStarted(true);
                setShowChatbot(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Guided Tour
            </button>

            <button
              onClick={() => setIsStarted(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Explore Freely
            </button>
          </div>

          <div className="flex justify-center space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="mailto:shreyas.atneu@gmail.com" className="text-gray-400 hover:text-white">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Main interface after starting
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-400 mr-4">Shreyas Sreenivas</h1>
            <span className="text-gray-400">Data Scientist & AI Developer</span>
          </div>

          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:shreyas.atneu@gmail.com" className="text-gray-400 hover:text-white">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Sidebar with agents */}
        <div className="lg:col-span-1 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Navigation</h2>

          <div className="space-y-2 mb-6">
            <button
              className={`w-full flex items-center p-3 rounded-lg ${currentSection === 'map' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setCurrentSection('map')}
            >
              <MapPin className="mr-2 h-5 w-5" />
              <span>World Map</span>
            </button>

            <button
              className={`w-full flex items-center p-3 rounded-lg ${currentSection === 'skills' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setCurrentSection('skills')}
            >
              <Book className="mr-2 h-5 w-5" />
              <span>Skills Tree</span>
            </button>

            <button
              className={`w-full flex items-center p-3 rounded-lg ${currentSection === 'projects' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setCurrentSection('projects')}
            >
              <Award className="mr-2 h-5 w-5" />
              <span>Projects</span>
            </button>

            <button
              className={`w-full flex items-center p-3 rounded-lg ${currentSection === 'experience' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => setCurrentSection('experience')}
            >
              <LineChart className="mr-2 h-5 w-5" />
              <span>Experience</span>
            </button>
          </div>

          <h2 className="text-xl font-bold mb-4">AI Agents</h2>

          <div className="space-y-3">
            {agents.map(agent => (
              <div
                key={agent.id}
                className={`p-3 rounded-lg ${agent.color} bg-opacity-20 border border-gray-700 hover:bg-opacity-30 cursor-pointer`}
              >
                <div className="flex items-center">
                  <div className={`${agent.color} p-2 rounded-full mr-3`}>
                    {agent.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{agent.name}</h3>
                    <p className="text-xs text-gray-400">{agent.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
              onClick={() => setShowChatbot(!showChatbot)}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              {showChatbot ? 'Hide Assistant' : 'Show Assistant'}
            </button>
          </div>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-3 h-[70vh]">
          {renderContent()}
        </div>
      </main>

      {/* Chatbot */}
      {showChatbot && (
        <div className="fixed bottom-4 right-4 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden z-10">
          <div className="bg-purple-600 p-3 flex justify-between items-center">
            <h3 className="text-white font-bold">Portfolio Assistant</h3>
            <button
              className="text-white hover:text-gray-200"
              onClick={() => setShowChatbot(false)}
            >
              ✕
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-3 space-y-3">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`${msg.sender === 'bot'
                  ? 'bg-purple-900 bg-opacity-50 text-white'
                  : 'bg-blue-600 ml-auto'
                  } p-3 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'ml-auto' : ''}`}
              >
                {msg.message}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-700 flex">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Shreyas's work..."
              className="flex-grow bg-gray-700 text-white p-2 rounded-l-lg focus:outline-none"
            />
            <button
              onClick={handleChatSubmit}
              className="bg-purple-600 text-white p-2 rounded-r-lg"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}