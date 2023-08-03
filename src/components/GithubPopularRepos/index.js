import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatuses = {
  intial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    popularReposList: [],
    activeLanguageFilterId: languageFiltersData[0].id,
    apiStatus: apiStatuses.intial,
  }

  componentDidMount() {
    this.getPopularReposList()
  }

  getPopularReposList = async () => {
    const {activeLanguageFilterId} = this.state
    this.setState({apiStatus: apiStatuses.intial})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`
    try {
      const response = await fetch(apiUrl)
      const {popular_repos} = await response.json()
      const modifiedData = popular_repos.map(repo => ({
        id: repo.id,
        name: repo.name,
        issuesCount: repo.issues_count,
        forksCount: repo.forks_count,
        avatarUrl: repo.avatar_url,
        starsCount: repo.stars_count,
      }))
      this.setState({
        popularReposList: modifiedData,
        apiStatus: apiStatuses.success,
      })
    } catch (error) {
      this.setState({apiStatus: apiStatuses.failure})
    }
  }

  updateActiveLanguageFilterId = id => {
    this.setState({activeLanguageFilterId: id}, this.getPopularReposList)
  }

  renderRepositoryListsView = () => {
    const {popularReposList} = this.state
    return (
      <ul className="repository-lists-container">
        {popularReposList.map(repo => (
          <RepositoryItem key={repo.id} repoDetails={repo} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
      <p className="failure-view-text">Something Went Wrong</p>
    </>
  )

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatuses.success:
        return this.renderRepositoryListsView()
      case apiStatuses.failure:
        return this.renderFailureView()
      default:
        return this.renderLoadingView()
    }
  }

  render() {
    const {activeLanguageFilterId} = this.state
    return (
      <div className="app-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="language-filters-list">
          {languageFiltersData.map(language => (
            <LanguageFilterItem
              key={language.id}
              updateActiveLanguageFilterId={this.updateActiveLanguageFilterId}
              isActiveLanguage={language.id === activeLanguageFilterId}
              languageDetails={language}
            />
          ))}
        </ul>
        {this.renderViews()}
      </div>
    )
  }
}

export default GithubPopularRepos
