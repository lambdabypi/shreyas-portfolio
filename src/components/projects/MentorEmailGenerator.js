import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { professorData } from '../../data/professors';

// Simple SVG for the search icon
const SearchIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<circle cx="11" cy="11" r="8"></circle>
		<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
	</svg>
);

export default function MentorEmailGenerator() {
	// CSS classes for better containment
	const containerClasses = "h-[550px] overflow-hidden flex flex-col border border-white/30 rounded-lg";
	const [professors] = useState(professorData);
	const [selectedTab, setSelectedTab] = useState('info');
	const [selectedProfessor, setSelectedProfessor] = useState(null);
	const [emailContent, setEmailContent] = useState('');
	const [copied, setCopied] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedDepartment, setSelectedDepartment] = useState('All');
	const [researchFilter, setResearchFilter] = useState('');
	const [viewMode, setViewMode] = useState('card');
	const [studentInfo, setStudentInfo] = useState({
		name: 'Shreyas Sreenivas',
		id: '002825934',
		program: 'Data Analytics Engineering',
		projectFocus: 'providing low-cost and offline medical support in underserved regions',
		background: 'AI development and data engineering',
		skills: 'Python, machine learning frameworks (TensorFlow, PyTorch), and natural language processing',
		achievements: 'developing a multi-agent framework that integrates general-purpose and fine-tuned LLMs with critique mechanisms for medical applications, achieving 92% alignment with healthcare expertise requirements',
		experience: 'engineering secure, AI-powered platforms using FastAPI and AWS, with a focus on real-time analytics and cloud-native solutions'
	});

	// Extract unique departments for filtering
	const departments = useMemo(() => {
		const deptSet = new Set(professors.map(prof => prof.department));
		return ['All', ...Array.from(deptSet)].sort();
	}, [professors]);

	// Extract common research areas for auto-suggestions
	const commonResearchAreas = useMemo(() => {
		const areas = professors
			.flatMap(prof => prof.research.toLowerCase().split(/[,.;]/).map(area => area.trim()))
			.filter(area => area.length > 3);

		// Count occurrences and get top 20
		const counts = {};
		areas.forEach(area => {
			counts[area] = (counts[area] || 0) + 1;
		});

		return Object.entries(counts)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 20)
			.map(([area]) => area);
	}, [professors]);

	// Filter professors based on search, department, and research area
	const filteredProfessors = useMemo(() => {
		return professors.filter(professor => {
			const matchesSearch = !searchTerm ||
				professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				professor.email.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesDepartment = selectedDepartment === 'All' ||
				professor.department === selectedDepartment;

			const matchesResearch = !researchFilter ||
				professor.research.toLowerCase().includes(researchFilter.toLowerCase());

			return matchesSearch && matchesDepartment && matchesResearch;
		});
	}, [professors, searchTerm, selectedDepartment, researchFilter]);

	// Memoize the generateEmail function to avoid infinite loops
	const generateEmail = useCallback((professor) => {
		// Find research overlap with project focus
		const projectKeywords = studentInfo.projectFocus.toLowerCase().split(' ');

		// Common research keywords to look for
		const researchKeywords = [
			"healthcare", "data analytics", "AI", "machine learning",
			"optimization", "predictive", "digital", "offline", "supply chain",
			"operations research", "quality", "reliability", "systems engineering"
		];

		// Find keywords that appear in both project focus and professor's research
		const allKeywords = [...projectKeywords, ...researchKeywords];

		// Find research interests that match keywords
		const relevantInterests = allKeywords.filter(keyword =>
			professor.research.toLowerCase().includes(keyword.toLowerCase()) &&
			keyword.length > 3 // Skip very short words
		);

		// Get unique keywords
		const uniqueInterests = [...new Set(relevantInterests)];

		let researchOverlap = uniqueInterests.length > 0
			? uniqueInterests.slice(0, 3).join(", ") // Limit to top 3 matches
			: "data analytics and healthcare technology";

		const email = `Dear Professor ${professor.name},

I hope this email finds you well. I am ${studentInfo.name}, a master's student in ${studentInfo.program} (Student ID: ${studentInfo.id}). I am writing to inquire if you would be willing to hold the role of a mentor for my Master's Project.

I have attached my project proposal, which focuses on ${studentInfo.projectFocus}. The project aligns with your research interests in ${researchOverlap} and I believe your expertise would be invaluable to its success.

Additionally, I would like to express my interest in any Teaching Assistant or Research Assistant positions that may be available during the fall semester. I have a strong background in ${studentInfo.background}, with experience building intelligent systems using ${studentInfo.skills}. My recent work includes ${studentInfo.achievements}. I've also gained experience in ${studentInfo.experience}.

I would appreciate the opportunity to discuss either or both of these matters at your convenience.

Thank you for your consideration.

Best regards,
${studentInfo.name}
${studentInfo.id}
${studentInfo.program}`;

		setEmailContent(email);
	}, [studentInfo]);

	useEffect(() => {
		if (selectedProfessor) {
			generateEmail(selectedProfessor);
		}
	}, [selectedProfessor, generateEmail]);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(emailContent).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	const handleStudentInfoChange = (e) => {
		const { name, value } = e.target;
		setStudentInfo(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleQuickResearchFilter = (area) => {
		setResearchFilter(area);
	};

	const clearFilters = () => {
		setSearchTerm('');
		setSelectedDepartment('All');
		setResearchFilter('');
	};

	return (
		<div className={containerClasses}>
			<div className="p-2 border-b border-white/10 bg-blue-500/10 shrink-0">
				<h1 className="text-xl font-bold text-center text-black">MENTOR - Messaging ENvironment for Teacher Outreach & Recruitment</h1>
			</div>

			<div className="p-2 overflow-y-auto flex-grow glass-scrollbar">
				{/* Tabs for organizing content in a smaller space */}
				<div className="flex space-x-1 mb-3">
					<button
						className={`px-2 py-1 text-sm rounded-t ${selectedTab === 'info' ? 'bg-blue-100/50 font-medium' : 'bg-white/10'}`}
						onClick={() => setSelectedTab('info')}
					>
						Your Info
					</button>
					<button
						className={`px-2 py-1 text-sm rounded-t ${selectedTab === 'search' ? 'bg-blue-100/50 font-medium' : 'bg-white/10'}`}
						onClick={() => setSelectedTab('search')}
					>
						Find Professor
					</button>
					<button
						className={`px-2 py-1 text-sm rounded-t ${selectedTab === 'tips' ? 'bg-blue-100/50 font-medium' : 'bg-white/10'}`}
						onClick={() => setSelectedTab('tips')}
					>
						Tips
					</button>
				</div>

				{/* Student Information Section */}
				{selectedTab === 'info' && (
					<div className="p-3 rounded-lg bg-white/10 backdrop-blur-md">
						<h2 className="text-lg font-semibold mb-2 text-black">Your Information</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
								<input
									type="text"
									name="name"
									value={studentInfo.name}
									onChange={handleStudentInfoChange}
									className="w-full p-1.5 border border-gray-300 rounded text-black bg-white/80 text-sm"
								/>
							</div>
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">Student ID</label>
								<input
									type="text"
									name="id"
									value={studentInfo.id}
									onChange={handleStudentInfoChange}
									className="w-full p-1.5 border border-gray-300 rounded text-black bg-white/80 text-sm"
								/>
							</div>
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">Program/Major</label>
								<input
									type="text"
									name="program"
									value={studentInfo.program}
									onChange={handleStudentInfoChange}
									className="w-full p-1.5 border border-gray-300 rounded text-black bg-white/80 text-sm"
								/>
							</div>
							<div className="md:col-span-2">
								<label className="block text-xs font-medium text-gray-700 mb-1">Project Focus</label>
								<textarea
									name="projectFocus"
									value={studentInfo.projectFocus}
									onChange={handleStudentInfoChange}
									className="w-full p-1.5 border border-gray-300 rounded text-black bg-white/80 text-sm"
									rows="1"
								/>
							</div>
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">Background</label>
								<input
									type="text"
									name="background"
									value={studentInfo.background}
									onChange={handleStudentInfoChange}
									className="w-full p-1.5 border border-gray-300 rounded text-black bg-white/80 text-sm"
								/>
							</div>
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">Skills</label>
								<input
									type="text"
									name="skills"
									value={studentInfo.skills}
									onChange={handleStudentInfoChange}
									className="w-full p-1.5 border border-gray-300 rounded text-black bg-white/80 text-sm"
								/>
							</div>
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">Achievements</label>
								<textarea
									name="achievements"
									value={studentInfo.achievements}
									onChange={handleStudentInfoChange}
									className="w-full p-1.5 border border-gray-300 rounded text-black bg-white/80 text-sm"
									rows="1"
								/>
							</div>
							<div>
								<label className="block text-xs font-medium text-gray-700 mb-1">Experience</label>
								<textarea
									name="experience"
									value={studentInfo.experience}
									onChange={handleStudentInfoChange}
									className="w-full p-1.5 border border-gray-300 rounded text-black bg-white/80 text-sm"
									rows="1"
								/>
							</div>
						</div>
					</div>
				)}

				{/* Advanced Search and Filters */}
				{selectedTab === 'search' && (
					<div className="p-3 rounded-lg bg-white/10 backdrop-blur-md">
						<div className="flex flex-wrap gap-2 mb-2">
							{/* Search Bar */}
							<div className="flex-1 min-w-[200px]">
								<label className="block text-xs font-medium text-gray-700 mb-1">Search</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-gray-400">
										<SearchIcon />
									</div>
									<input
										type="text"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										placeholder="Search by name or email..."
										className="w-full pl-8 p-1.5 border border-gray-300 rounded text-black bg-white/80 text-sm"
									/>
								</div>
							</div>

							{/* Department Filter */}
							<div className="flex-1 min-w-[200px]">
								<label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
								<select
									value={selectedDepartment}
									onChange={(e) => setSelectedDepartment(e.target.value)}
									className="w-full p-1.5 border border-gray-300 rounded text-black bg-white/80 text-sm"
								>
									{departments.map((dept, index) => (
										<option key={index} value={dept}>{dept}</option>
									))}
								</select>
							</div>

							{/* Research Area Filter */}
							<div className="flex-1 min-w-[200px]">
								<label className="block text-xs font-medium text-gray-700 mb-1">Research Area</label>
								<input
									type="text"
									value={researchFilter}
									onChange={(e) => setResearchFilter(e.target.value)}
									placeholder="e.g. machine learning..."
									className="w-full p-1.5 border border-gray-300 rounded text-black bg-white/80 text-sm"
								/>
							</div>
						</div>

						{/* Common Research Areas */}
						<div className="mb-2">
							<label className="block text-xs font-medium text-gray-700 mb-1">Common Research:</label>
							<div className="flex flex-wrap gap-1">
								{commonResearchAreas.slice(0, 8).map((area, index) => (
									<button
										key={index}
										onClick={() => handleQuickResearchFilter(area)}
										className="text-xs px-1.5 py-0.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full truncate max-w-[120px]"
										title={area}
									>
										{area}
									</button>
								))}
							</div>
						</div>

						{/* View Controls */}
						<div className="flex justify-between items-center mt-2 mb-2">
							<div className="flex items-center space-x-1">
								<button
									onClick={() => setViewMode('card')}
									className={`px-2 py-0.5 text-xs rounded ${viewMode === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
								>
									Cards
								</button>
								<button
									onClick={() => setViewMode('table')}
									className={`px-2 py-0.5 text-xs rounded ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
								>
									Table
								</button>
							</div>

							<div className="flex items-center">
								<span className="mr-2 text-xs text-gray-600">
									{filteredProfessors.length} found
								</span>
								<button
									onClick={clearFilters}
									className="px-2 py-0.5 text-xs bg-gray-200 hover:bg-gray-300 rounded"
								>
									Clear
								</button>
							</div>
						</div>

						{/* Professor List - Card View */}
						{viewMode === 'card' && (
							<div className="mb-2">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[200px] overflow-y-auto">
									{filteredProfessors.map((professor) => (
										<div
											key={professor.name + professor.email}
											className={`p-2 rounded-lg cursor-pointer transition-all bg-white/10 backdrop-blur-sm ${selectedProfessor?.name === professor.name
												? 'bg-blue-100/50 border-blue-500 shadow-md'
												: 'hover:bg-white/20 border-white/20 hover:shadow'
												}`}
											onClick={() => setSelectedProfessor(professor)}
										>
											<h3 className="font-bold text-sm truncate text-black">{professor.name}</h3>
											<p className="text-xs text-gray-600 truncate">{professor.department}</p>
											{professor.research && (
												<div className="mt-1">
													<p className="text-xs text-gray-700 line-clamp-1">{professor.research}</p>
												</div>
											)}
											<p className="text-xs text-blue-600 truncate">{professor.email}</p>
										</div>
									))}
								</div>

								{filteredProfessors.length === 0 && (
									<div className="text-center p-2 bg-gray-100/50 rounded">
										<p className="text-xs text-black">No professors match your search criteria.</p>
									</div>
								)}
							</div>
						)}

						{/* Professor List - Table View */}
						{viewMode === 'table' && (
							<div className="mb-2 overflow-x-auto h-[200px]">
								<table className="w-full border-collapse text-xs">
									<thead>
										<tr className="bg-blue-200/50">
											<th className="border p-1 text-left text-black">Name</th>
											<th className="border p-1 text-left text-black">Department</th>
											<th className="border p-1 text-left text-black">Research</th>
											<th className="border p-1 text-left text-black">Actions</th>
										</tr>
									</thead>
									<tbody>
										{filteredProfessors.map((professor) => (
											<tr
												key={professor.name + professor.email}
												className={`border hover:bg-gray-100/30 ${selectedProfessor?.name === professor.name
													? 'bg-blue-100/30'
													: 'bg-white/10'
													}`}
											>
												<td className="border p-1">
													<div className="font-medium text-black text-xs">{professor.name}</div>
												</td>
												<td className="border p-1 text-xs text-black">{professor.department}</td>
												<td className="border p-1 text-xs text-black max-w-xs">
													<div className="line-clamp-1">
														{professor.research || "No research information available"}
													</div>
												</td>
												<td className="border p-1">
													<button
														onClick={() => setSelectedProfessor(professor)}
														className="px-2 py-0.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
													>
														Select
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>

								{filteredProfessors.length === 0 && (
									<div className="text-center p-2 bg-gray-100/50 rounded">
										<p className="text-xs text-black">No professors match your search criteria.</p>
									</div>
								)}
							</div>
						)}
					</div>
				)}

				{/* Tips Section */}
				{selectedTab === 'tips' && (
					<div className="p-3 bg-yellow-50/50 backdrop-blur-md border border-yellow-200/50 rounded-lg">
						<h3 className="font-semibold text-yellow-800 mb-1 text-sm">Tips for Outreach:</h3>
						<ul className="space-y-1 text-xs text-yellow-800">
							<li className="flex">
								<span className="mr-1">•</span>
								<span>Follow up if no response in 7-10 days</span>
							</li>
							<li className="flex">
								<span className="mr-1">•</span>
								<span>Be prepared to discuss your project in detail</span>
							</li>
							<li className="flex">
								<span className="mr-1">•</span>
								<span>Schedule a brief meeting rather than email discussions</span>
							</li>
							<li className="flex">
								<span className="mr-1">•</span>
								<span>Review their publications to show genuine interest</span>
							</li>
							<li className="flex">
								<span className="mr-1">•</span>
								<span>Be specific about mentorship expectations</span>
							</li>
						</ul>
					</div>
				)}
			</div>

			{/* Generated Email (Sticky at the bottom) - Only shown when a professor is selected */}
			{selectedProfessor && (
				<div className="sticky bottom-0 p-2 shadow-lg border-t border-blue-500 bg-white/80 backdrop-blur-md max-h-48 overflow-y-auto shrink-0">
					<div className="flex justify-between items-center mb-1">
						<h2 className="text-sm font-semibold text-blue-700">
							Email for Prof. {selectedProfessor.name}
						</h2>
						<button
							onClick={copyToClipboard}
							className={`px-2 py-1 rounded text-white text-xs ${copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
						>
							{copied ? 'Copied!' : 'Copy to Clipboard'}
						</button>
					</div>
					<div className="bg-white/30 backdrop-blur-md border border-white/30 rounded-lg p-2 whitespace-pre-wrap font-mono text-xs text-black h-32 overflow-y-auto">
						{emailContent}
					</div>
				</div>
			)}
		</div>
	);
}