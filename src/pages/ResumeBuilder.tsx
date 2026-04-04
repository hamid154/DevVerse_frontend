import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Input, Textarea } from '../components/Input';
import { FileText, Download, Mail, Phone, MapPin, Globe, Sparkles } from 'lucide-react';
import { askAI } from '../utils/ai';

interface ResumeData {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
    experience: string;
    education: string;
    skills: string;
}

export default function ResumeBuilder() {
    const [data, setData] = useState<ResumeData>({
        name: 'Your Name',
        title: 'Senior Frontend Developer',
        email: 'you@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        website: 'github.com/yourname',
        summary: 'Passionate frontend developer with 5+ years of experience building modern web applications using React, TypeScript, and Tailwind CSS. Strong focus on UI/UX, performance, and accessibility.',
        experience: 'Senior Frontend Developer @ TechCorp (2020 - Present)\n- Led migration of legacy Angular app to React\n- Improved performance by 40%\n\nFrontend Developer @ WebStudio (2018 - 2020)\n- Built responsive landing pages\n- Collaborated with design team',
        education: 'B.S. Computer Science\nUniversity of Technology (2014 - 2018)',
        skills: 'React, TypeScript, Next.js, Tailwind CSS, Node.js, GraphQL'
    });

    const [isAIGenerating, setIsAIGenerating] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);

    const handleChange = (field: keyof ResumeData, value: string) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const handlePrint = () => {
        window.print();
    };

    const handleAutoWrite = async () => {
        if (!data.title.trim()) {
            setAiError("Please enter a Job Title first so AI knows what to write.");
            return;
        }

        setIsAIGenerating(true);
        setAiError(null);

        const prompt = `
            Act as an expert technical resume writer. I am applying for the role of "${data.title}".
            Write extremely professional, ATS-friendly resume content for me. Use strong action verbs.
            You MUST return ONLY raw valid JSON. Do not wrap it in markdown codeblocks (no \`\`\`json).
            Do not include any conversational text.
            Return a JSON object with exactly these 4 keys:
            {
                "summary": "A powerful 2-3 sentence professional summary highlighting expertise and value.",
                "experience": [
                    "Dummy Experience Title @ Dummy Company (2021 - Present)",
                    "- Bullet point 1 showing impact and metric",
                    "- Bullet point 2...",
                    "Previous Role @ OldCompany (2018 - 2021)",
                    "- Bullet point 1..."
                ],
                "education": [
                    "Degree Name",
                    "University Name (2014 - 2018)"
                ],
                "skills": "Comma, separated, list, of, highly, relevant, hard, skills"
            }
            CRITICAL RULE: "experience" and "education" MUST be Arrays of Strings. Each new line or bullet point should be a separate string in the array. Do not use trailing commas.
        `;

        try {
            const responseText = await askAI(prompt);
            console.log("AI RAW RESPONSE:", responseText); // Log to browser console just in case
            
            // Extract JSON block robustly in case AI adds conversation text
            let cleanJson = responseText;
            const match = responseText.match(/\{[\s\S]*\}/);
            if (match) {
                cleanJson = match[0];
            } else {
                throw new Error("Backend did not return a valid JSON object starting with '{'.");
            }

            // Remove potentially hallucinated trailing commas which break standard JSON.parse
            cleanJson = cleanJson.replace(/,\s*([\]}])/g, '$1');
            
            const parsedData = JSON.parse(cleanJson);
            
            if (!parsedData.summary || !parsedData.experience || !parsedData.education || !parsedData.skills) {
                throw new Error("Missing required fields (summary, experience, education, skills) from AI payload.");
            }

            // Also guarantee that skills is always a string so .split doesn't crash the React component
            const safeSkills = Array.isArray(parsedData.skills) ? parsedData.skills.join(', ') : parsedData.skills;

            setData(prev => ({
                ...prev,
                summary: parsedData.summary,
                experience: Array.isArray(parsedData.experience) ? parsedData.experience.join('\n') : String(parsedData.experience),
                education: Array.isArray(parsedData.education) ? parsedData.education.join('\n') : String(parsedData.education),
                skills: safeSkills
            }));
        } catch (err: any) {
            console.error("AI GENERATION ERROR:", err);
            setAiError("AI Error: " + (err.message || "Failed to parse API data. Check console."));
        } finally {
            setIsAIGenerating(false);
        }
    };

    // Helper to render plain text realistically like a rich-text resume
    const renderRichText = (text: string) => {
        const lines = text.split('\n');
        return (
            <ul className="list-none space-y-1">
                {lines.map((line, i) => {
                    const trimmed = line.trim();
                    if (!trimmed) return <div key={i} className="h-3"></div>; // spacing
                    
                    if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
                        return (
                            <li key={i} className="relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-purple-500 print:before:text-black">
                                {trimmed.substring(1).trim()}
                            </li>
                        );
                    }
                    
                    // Treat non-bullet lines as Bold Headers (like "Job Title @ Company")
                    return <li key={i} className="font-extrabold text-slate-900 print:text-black mt-3 first:mt-0">{trimmed}</li>;
                })}
            </ul>
        );
    };

    return (
        <div className="max-w-7xl mx-auto flex flex-col space-y-6 print:m-0 print:p-0 print:block">
            {/* INJECT PRINT PADDING REMOVAL FOR CLEAN PDFs */}
            <style type="text/css" media="print">
                {`
                    @page { size: auto; margin: 15mm; } 
                `}
            </style>

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 print:hidden">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                        <FileText className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Resume Builder</h1>
                        <p className="text-slate-500 dark:text-gray-400 text-sm">Create and print your professional resume</p>
                    </div>
                </div>
                <Button onClick={handlePrint} className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white w-full md:w-auto shadow-lg">
                    <Download className="w-4 h-4 mr-2" />
                    <span>Print / Export PDF</span>
                </Button>
            </div>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-14rem)] print:block print:h-auto print:gap-0">
                
                {/* Editor Side */}
                <Card className="flex flex-col p-6 overflow-y-auto custom-scrollbar h-full print:hidden glass-panel border border-white/10 relative">
                    <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-white/10 pb-4">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            Personal Information
                        </h2>
                        <button
                            onClick={handleAutoWrite}
                            disabled={isAIGenerating || !data.title.trim()}
                            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 text-purple-600 dark:text-purple-300 hover:bg-purple-500 hover:text-white transition-all flex items-center gap-1.5 disabled:opacity-50 shadow-sm"
                        >
                            <Sparkles className={`w-3.5 h-3.5 ${isAIGenerating ? 'animate-spin' : ''}`} />
                            {isAIGenerating ? 'Writing Magic...' : 'Auto-Write with AI'}
                        </button>
                    </div>

                    {aiError && (
                        <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-500 font-medium text-sm p-4 rounded-xl">
                            {aiError}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Job Title" value={data.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="e.g. Data Scientist" />
                            <Input label="Full Name" value={data.name} onChange={(e) => handleChange('name', e.target.value)} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Email" value={data.email} onChange={(e) => handleChange('email', e.target.value)} />
                            <Input label="Phone" value={data.phone} onChange={(e) => handleChange('phone', e.target.value)} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Location" value={data.location} onChange={(e) => handleChange('location', e.target.value)} />
                            <Input label="Website / Link" value={data.website} onChange={(e) => handleChange('website', e.target.value)} />
                        </div>

                        <Textarea label="Professional Summary" rows={3} value={data.summary} onChange={(e) => handleChange('summary', e.target.value)} />
                        <Input label="Skills (comma separated)" value={data.skills} onChange={(e) => handleChange('skills', e.target.value)} />
                        <Textarea label="Experience" rows={6} value={data.experience} onChange={(e) => handleChange('experience', e.target.value)} />
                        <Textarea label="Education" rows={3} value={data.education} onChange={(e) => handleChange('education', e.target.value)} />
                    </div>
                </Card>

                {/* Live Preview Side / Print Output */}
                <div className="bg-white rounded-xl overflow-y-auto custom-scrollbar h-full shadow-xl relative block print:block print:overflow-visible print:h-auto print:shadow-none print:w-full print:absolute print:top-0 print:left-0">
                    <div className="p-8 pb-16 min-h-full print:p-0 print:text-black">
                        
                        {/* Resume Header */}
                        <div className="border-b-2 border-slate-300 print:border-black pb-6 mb-6">
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase mb-2 print:text-black">{data.name || 'Your Name'}</h1>
                            <h2 className="text-xl text-purple-600 print:text-slate-800 font-bold tracking-wide uppercase">{data.title || 'Your Title'}</h2>

                            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-slate-600 font-medium print:text-black">
                                {data.email && <div className="flex items-center"><Mail className="w-4 h-4 mr-2 text-slate-400 print:text-black" />{data.email}</div>}
                                {data.phone && <div className="flex items-center"><Phone className="w-4 h-4 mr-2 text-slate-400 print:text-black" />{data.phone}</div>}
                                {data.location && <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-slate-400 print:text-black" />{data.location}</div>}
                                {data.website && <div className="flex items-center"><Globe className="w-4 h-4 mr-2 text-slate-400 print:text-black" />{data.website}</div>}
                            </div>
                        </div>

                        {/* Summary Section */}
                        {data.summary && (
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-900 border-b-2 border-slate-200 print:border-black pb-1 mb-3 uppercase tracking-widest print:text-black">Summary</h3>
                                <p className="text-slate-700 leading-relaxed text-sm print:text-black font-medium">{data.summary}</p>
                            </div>
                        )}

                        {/* Skills Section */}
                        {data.skills && (
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-900 border-b-2 border-slate-200 print:border-black pb-1 mb-3 uppercase tracking-widest print:text-black">Skills</h3>
                                <div className="flex flex-wrap gap-2 print:gap-1.5 mt-2">
                                    {data.skills.split(',').map((skill, index) => (
                                        <span key={index} className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-bold border border-slate-200 shadow-sm print:bg-transparent print:border-slate-800 print:shadow-none print:text-black print:rounded-sm">
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Experience Section */}
                        {data.experience && (
                            <div className="mb-6 break-inside-avoid">
                                <h3 className="text-lg font-bold text-slate-900 border-b-2 border-slate-200 print:border-black pb-1 mb-3 uppercase tracking-widest print:text-black">Experience</h3>
                                <div className="text-slate-700 leading-relaxed text-sm font-medium print:text-black">
                                    {renderRichText(data.experience)}
                                </div>
                            </div>
                        )}

                        {/* Education Section */}
                        {data.education && (
                            <div className="break-inside-avoid">
                                <h3 className="text-lg font-bold text-slate-900 border-b-2 border-slate-200 print:border-black pb-1 mb-3 uppercase tracking-widest print:text-black">Education</h3>
                                <div className="text-slate-700 leading-relaxed text-sm font-medium print:text-black">
                                    {renderRichText(data.education)}
                                </div>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
