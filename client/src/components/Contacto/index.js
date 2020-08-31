import React from "react"
import Form from './CriarContato'


const handleSubmit = values => console.log("")
const initialValues = {}
const exportCriarContato = () => (
    <div className="exportform">
        <Form handleSubmit={() => handleSubmit()} initialValues={initialValues}/>
    </div>
)

export default exportCriarContato