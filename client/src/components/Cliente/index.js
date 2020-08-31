import React from "react"
import Form from './CriarCliente'

const handleSubmit = values => console.log("")
const initialValues = {}
const exportCriarCliente = () => (
    <div className="exportform">
        <Form handleSubmit={() => handleSubmit()} initialValues={initialValues}/>
    </div>
)

export default exportCriarCliente