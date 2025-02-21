import { create} from 'zustand';

export const useTemplateStore = create((set) => ({
    templates: [],
    setTemplates: (templates) => set({ templates }),
    
    createTemplate: async (newTemplate) => {
        if(!newTemplate.name) {
            return { success: false, message: "Please provide a name for the template" };
        }
        // const res = await fetch("http://localhost:8000/api/workout-templates", {
        const res = await fetch("http://192.168.1.119:8000/api/workout-templates", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTemplate),
        })
        const data = await res.json();
        // set((state) => ({ templates: [...state.templates, data.data] }));
        console.log(data);
        return { success: true, message: "Template created successfully" };
    },
    
    getTemplates: async () => {
        // const res = await fetch("http://localhost:8000/api/workout-templates", {
        const res = await fetch("http://192.168.1.119:8000/api/workout-templates", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json();
        console.log(data);
        return {success: true, message: data};
    },
    
    deleteTemplate: async (template) => {
        // const res = await fetch(`http://localhost:8000/api/templates/${template._id}`, {
        const res = await fetch(`http://192.168.1.119:8000/api/templates/${template._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await res.json();
        set((state) => ({ templates: state.templates.filter((t) => t._id !== template._id) }));
        return { success: true, message: "Template deleted successfully" };
    },
    
    updateTemplate: async (template) => {
        // const res = await fetch(`http://localhost:8000/api/templates/${template._id}`, {
        const res = await fetch(`http://192.168.1.119:8000/api/templates/${template._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(template),
        })
        const data = await res.json();
        set((state) => ({ templates: state.templates.map((t) => t._id === template._id ? template : t) }));
        return { success: true, message: "Template updated successfully" };
    },
}));
