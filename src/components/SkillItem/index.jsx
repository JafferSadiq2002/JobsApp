import './index.css'

const SkillItem = props => {
  const {skilldetails} = props
  const {name, imageUrl} = skilldetails
  return (
    <li className="skill-container">
      <img src={imageUrl} className="skill-image" alt={name} />
      <p>{name}</p>
    </li>
  )
}

export default SkillItem
