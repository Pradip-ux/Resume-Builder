import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets';
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOffIcon, FileText, FolderIcon, GraduationCap, Share, Share2Icon, Sparkles, User } from 'lucide-react';
import PersonalInfo from '../components/PersonalInfo';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import ColorPicker from '../components/ColorPicker';
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm';
import SkillsForm from '../components/SkillsForm';
import { useSelector } from 'react-redux';
import api from '../configs/api';
import toast from 'react-hot-toast';
const ResumeBuilder = () => {

  const { resumeId } = useParams();
  const { token } = useSelector(state => state.auth)
  
  const [resumeData, setresumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public:false
  })

  const loadExistResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (data.resume) {
        setresumeData(data.resume)
        document.title = data.resume.title;
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const [activeSectionIndex, setactiveSectionIndex] = useState(0)
  const [removeBackground, setremoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "project", name: "Project", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },


  ]

  const activeSection = sections[activeSectionIndex]

  useEffect(() => {
    loadExistResume()
  }, [])

  const changeVisibility = async () => {
    try {
      const formData = new FormData()
      formData.append('resumeId', resumeId)
      // formData.append('resumeData',JSON.stringify({ public: !resumeData.public }))
         formData.append('resumeData',JSON.stringify({ public: !resumeData.public })
);
      const { data } = await api.put(`/api/resumes/update`,  formData , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setresumeData({ ...resumeData, public: !resumeData.public })
      toast.success(data.message)
    } catch (error) {
      console.error(error.message)
    }
  }

  const HandleShare = () => {
    const frontendUrl = window.location.href.split('/app')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" })
    }
    else {
      alert("Share not supported on this browser")
    }
  }

  const DownloadResume = () => {
    window.print();
  }
  // const saveResume = async () => {
  //   try {
  //     let updatedResumeData = structuredClone(resumeData)
  //     if (resumeData.personal_info?.image && typeof resumeData.personal_info.image === 'object') {
  //       delete updatedResumeData.personal_info.image
  //     }
  //     const formData = new FormData();
  //     formData.append('resumeId', resumeId)
  //     formData.append('resumeData', JSON.stringify(updatedResumeData))
  //     removeBackground && formData.append('removeBackground', 'yes')
  //     typeof resumeData.personal_info.image === 'object' && formData.append('image', resumeData.personal_info.image)
  //     const { data } = await api.put('/api/resumes/update', formData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     setresumeData(data.resume)
  //     // toast.success(data.message)
  //   } catch (error) {
  //     console.error(error.message)
  //   }
  // }
  const saveResume = async () => {
    try {
        let updatedResumeData = structuredClone(resumeData);

        if (
            resumeData.personal_info?.image &&
            typeof resumeData.personal_info.image === 'object'
        ) {
            delete updatedResumeData.personal_info.image;
        }

        console.log("BEFORE SAVE:", updatedResumeData);
        console.log("EXPERIENCE:", updatedResumeData.experience);

        const formData = new FormData();

        formData.append('resumeId', resumeId);
        formData.append(
            'resumeData',
            JSON.stringify(updatedResumeData)
        );

        if (removeBackground) {
            formData.append('removeBackground', 'yes');
        }

        if (
            typeof resumeData.personal_info?.image === 'object'
        ) {
            formData.append(
                'image',
                resumeData.personal_info.image
            );
        }

        const { data } = await api.put(
            '/api/resumes/update',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("BACKEND RESPONSE:", data);
        console.log("BACKEND RESUME:", data.resume);

        setresumeData(data.resume);

    } catch (error) {
        console.error(
            "SAVE ERROR:",
            error.response?.data || error.message
        );
    }
};
  return (
    <div>

      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to='/app' className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className='size-4' />Back to Dashboard

        </Link>
      </div>

      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          {/* Left Panel Form */}
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
              {/* Progress bar using activesectionIndex */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
              <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-green-600 border-none
                  transition-all duration-2000' style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%  ` }} />

              {/* section navigation */}
              <div className='flex justify-between items-center mb-6  border-gray-300 py-1'>
                <div className='flex  items-center gap-2'>
                  <TemplateSelector selectedTemplate={resumeData.template}
                    onChange={(template) => setresumeData(prev => ({ ...prev, template }))} />
                  <ColorPicker selectedColor={resumeData.accent_color}
                    onChange={(color) => { setresumeData(prev => ({ ...prev, accent_color: color })) }} />
                </div>
                <div className='flex items-center'>
                  {activeSectionIndex !== 0 && (
                    <button onClick={() => setactiveSectionIndex((prev) => Math.max(prev - 1, 0))}
                      className='flex items-center gap-1 p-3 rounded-lg text-sm  font-medium text-gray-600
                  hover:bg-gray-50 transition-all' disabled={activeSectionIndex === 0}>
                      <ChevronLeft className='size-4' />Previous
                    </button>
                  )}
                  <button onClick={() => setactiveSectionIndex((prev) => Math.min(prev + 1, sections.length - 1))}
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all 
                  ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`} disabled={activeSectionIndex === sections.length - 1}>
                    <ChevronRight className='size-4' />Next
                  </button>

                </div>


              </div>

              {/* Form Content */}
              <div className='space-y-6'>
                {activeSection.id === 'personal' && (
                  <PersonalInfo data={resumeData.personal_info} onChange={(data) => setresumeData(prev => ({ ...prev, personal_info: data }))}
                    removeBackground={removeBackground} setremoveBackground={setremoveBackground} />
                )}
                {activeSection.id === 'summary' && (
                  <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data) => setresumeData(prev => ({ ...prev, professional_summary: data }))}
                    setResumeData={setresumeData} />
                )}
                {activeSection.id === 'experience' && (
                  <ExperienceForm data={resumeData.experience} onChange={(data) => setresumeData(prev => ({ ...prev, experience: data }))}
                  />
                )}
                {activeSection.id === 'education' && (
                  <EducationForm data={resumeData.education} onChange={(data) => setresumeData(prev => ({ ...prev, education: data }))}
                  />
                )}
                {activeSection.id === 'project' && (
                  <ProjectForm data={resumeData.project} onChange={(data) => setresumeData(prev => ({ ...prev, project: data }))}
                  />
                )}
                {activeSection.id === 'skills' && (
                  <SkillsForm data={resumeData.skills} onChange={(data) => setresumeData(prev => ({ ...prev, skills: data }))}
                  />
                )}
              </div>
              <button onClick={() => {
                toast.promise(saveResume(), {
                  loading: 'Saving...',
                  success: 'Saved!',
                  error: 'Failed to save'
                });
              }} className='bg-gradient-to-br from-purple-100 to-purple-200
                ring-purple-300 text-indigo-600 ring hover:ring-indigo-400
                 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
                Save Changes
              </button>
            </div>
          </div>

          {/* Right Panel preview */}
          <div className='lg:col-span-7 max-lg:mt-6'>
            <div className='relative w-full'>
              {/* Buttons */}
              <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
                {resumeData.public && (
                  <button className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-200
                  text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors' onClick={HandleShare}>
                    <Share2Icon className='size-4 ' />
                  </button>
                )}
                <button onClick={changeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-indigo-100 to-indigo-200
                text-indigo-600 ring-indigo-300 rounded-lg hover:ring transition-colors'>
                  {
                    resumeData.public ?
                      <EyeIcon className='size-4' />
                      :
                      <EyeOffIcon className='size-4' />
                  }
                  {
                    resumeData.public ? 'Public' : 'Private'
                  }
                </button>
                <button onClick={DownloadResume} className='flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br
                from-indigo-100 to-indigo-200 text-indigo-600 rounded-lg ring-indigo-300 hover:ring transition-colors'>
                  <DownloadIcon className='size-4' /> Download
                </button>

              </div>
            </div>

            {/* Resume Preview */}
            <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
          </div>


        </div>
      </div>
    </div>


  )
}

export default ResumeBuilder