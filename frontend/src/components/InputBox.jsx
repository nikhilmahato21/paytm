
export function InputBox({label,name, type, placeholder,disabled}) {
    return <div>
      <div className="text-sm font-semibold text-slate-700 tracking-wide text-left py-2">
        {label}
      </div>
      <input disabled={disabled} required name={name} type={type} placeholder={placeholder} className="w-full px-2 py-2 border rounded-lg font-semibold text-gray-600 border-slate-200" />
    </div>
}