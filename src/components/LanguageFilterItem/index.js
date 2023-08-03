/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/button-has-type */
import './index.css'

const LanguageFilterItem = props => {
  const {
    updateActiveLanguageFilterId,
    isActiveLanguage,
    languageDetails,
  } = props
  const {id, language} = languageDetails

  const onClickButton = () => updateActiveLanguageFilterId(id)

  return (
    <li className="language-filter-item-conatiner">
      <button
        className={`filter-button ${isActiveLanguage ? 'active-language' : ''}`}
        onClick={onClickButton}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
