import React from 'react'
import { BriefcaseBusiness, User, Mail, Phone, MapPin, Link, Globe } from 'lucide-react'

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Link, type: "url" },
    { key: "website", label: "Website", icon: Globe, type: "url" }
  ]

  return (
    <div>
      {/* Heading */}
      <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
      <p className='text-sm text-gray-600'>Get Started with the personal information</p>

      {/* Image + Toggle Section */}
      <div className='flex items-center gap-4 mt-4'>

        {/* Image Upload */}
        <label>
          {data?.image ? (
            <img
              src={typeof data.image === 'string'
                ? data.image
                : URL.createObjectURL(data.image)}
              alt="user"
              className='w-16 h-16 rounded-full object-cover ring ring-slate-300 hover:opacity-80 cursor-pointer'
            />
          ) : (
            <div className='flex items-center gap-2 text-slate-600 hover:text-slate-700 cursor-pointer'>
              <User className='size-10 p-2 border rounded-full' />
              <span className="text-sm">Upload user image</span>
            </div>
          )}

          <input
            type="file"
            accept='image/jpeg,image/png'
            className='hidden'
            onChange={(e) => handleChange('image', e.target.files[0])}
          />
        </label>

        {/* Toggle */}
        {data?.image && typeof data.image === 'object' && (
          <div className='flex items-center gap-3'>
            <p className='text-sm'>Remove Background</p>

            <label className='relative inline-flex items-center cursor-pointer'>
              <input
                type="checkbox"
                className="sr-only peer"
                checked={removeBackground}
                onChange={() => setRemoveBackground(prev => !prev)}
              />

              {/* Background */}
              <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-600 transition-colors"></div>

              {/* Dot */}
              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
            </label>
          </div>
        )}

      </div>

      {/* Input Fields */}
      {fields.map((field) => {
        const Icon = field.icon

        return (
          <div key={field.key} className='space-y-1 mt-5'>
            <label className='flex items-center gap-2 text-sm font-medium text-gray-600'>
              <Icon className="size-4" />
              {field.label}
              {field.required && <span className='text-red-500'>*</span>}
            </label>

            <input
              type={field.type}
              value={data?.[field.key] || ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm'
              placeholder={`enter your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        )
      })}
    </div>
  )
}

export default PersonalInfoForm