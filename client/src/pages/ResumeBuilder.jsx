import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets'
import {
  ArrowLeftIcon,
  Briefcase,
  FolderIcon,
  Sparkles,
  User,
  FileText,
  GraduationCap,
  ChevronRight,
  ChevronLeft,
  Share2Icon,
  DownloadIcon,
  EyeIcon,        
  EyeOffIcon 
} from 'lucide-react'

import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProffesionalSummaryForm from '../components/ProffesionalSummaryForm'
import ExperienceForm from "../components/ExperienceForm"   // ✅ FIXED
import EducationForm from "../components/EducationForm"
import ProjectForm from "../components/ProjectForm"       // ✅ NEW
import SkillsForm from '../components/SkillsForm'

const ResumeBuilder = () => {

  const { resumeId } = useParams()

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]

  const loadExistingResume = () => {
    const resume = dummyResumeData.find(
      (resume) => String(resume._id) === resumeId
    )

    if (resume) {
      setResumeData(resume)
      document.title = resume.title
    }
  }

  useEffect(() => {
    loadExistingResume()
  }, [resumeId])

  const changeResumeVisibility = async ()=>{
    setResumeData({...resumeData, public: !resumeData.public})

  }
  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app')[0]
    const resumeUrl=frontendUrl +'/view/'+resumeId;
    if(navigator.share){
      navigator.share({
        url: resumeUrl,
        text:"My Resume"
      })
    }else{
      alert('Share not supported on this browser.')
    }
  }
  const downloadResume = () => {
    window.print();
  }

  return (
    <div>
      {/* Top */}
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link
          to={'/app'}
          className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700'
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>

          {/* LEFT PANEL */}
          <div className='relative lg:col-span-5'>
            <div className='bg-white rounded-lg shadow border p-6 pt-1'>

              {/* Progress */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
              <hr
                className='absolute top-0 left-0 h-1 bg-green-500'
                style={{
                  width: `${activeSectionIndex * 100 / (sections.length - 1)}%`
                }}
              />

              {/* Navigation */}
              <div className='flex justify-between items-center mb-6 border-b py-2'>

                {/* Template + Color */}
                <div className='flex gap-4'>
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData(prev => ({ ...prev, template }))
                    }
                  />

                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData(prev => ({ ...prev, accent_color: color }))
                    }
                  />
                </div>

                {/* Buttons */}
                <div className='flex items-center'>
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex(prev => Math.max(0, prev - 1))
                      }
                      className='flex items-center gap-1 p-2 text-gray-600'
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setActiveSectionIndex(prev =>
                        Math.min(sections.length - 1, prev + 1)
                      )
                    }
                    className='flex items-center gap-1 p-2 text-gray-600'
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* FORM */}
              <div className='space-y-6'>

                {activeSection.id === 'personal' && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, personal_info: data }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === 'summary' && (
                  <ProffesionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData(prev => ({
                        ...prev,
                        professional_summary: data
                      }))
                    }
                  />
                )}

                {activeSection.id === 'experience' && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, experience: data }))
                    }
                  />
                )}

                {activeSection.id === 'education' && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, education: data }))
                    }
                  />
                )}
                 {activeSection.id === 'projects' && (
                  <ProjectForm
                    data={resumeData.projects}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, projects: data }))
                    }
                  />
                )}
                {activeSection.id === 'skills' && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData(prev => ({ ...prev, skills: data }))
                    }
                  />
                )}

              </div>
              <button className='bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
                Save changes
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-7">
            <div className='relative w-full'>
              <div className='absolute bottom-3 left-0 right-0 flex itema-center justify-end gap-2'>
                {resumeData.public && (
                  <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
                    <Share2Icon className='size-4'/>Share
                  </button>
                  )}
                  <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors'>
                    {resumeData.public ? <EyeIcon className="size-4"/> :  <EyeOffIcon className="size-4"/>}
                    {resumeData.public ? "Public" : "Private"}
                  </button>
                  <button onClick={downloadResume} className='flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors'>
                    <DownloadIcon className='size-4'/>Download
                  </button>

              </div>

            </div>
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
              classes="mx-auto"
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder;