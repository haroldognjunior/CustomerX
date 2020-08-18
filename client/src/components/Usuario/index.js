import React from "react"
import Form from './CriarUsuario'

const handleSubmit = values => console.log("")
const initialValues = {}
const exportCriarUsuario = () => (
    <div className="exportform">
        <Form handleSubmit={() => handleSubmit()} initialValues={initialValues}/>
    </div>
)

export default exportCriarUsuario