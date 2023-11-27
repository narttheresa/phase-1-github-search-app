

const gitHubForm = document.querySelector('#github-form')
const user = document.querySelector('#user-list')
const repos = document.querySelector('#repos-list')
const togglebutton = document.querySelector('#toggle-button')

gitHubForm.addEventListener('submit', event => {
event.preventDefault()
user.innerHTML ='',
repos.innerHTML = ''

const searchValue = document.querySelector('#search').value 

fetch(`https://api.github.com/search/users?q=${searchValue}`)
    .then(resp => resp.json())
    .then(userData => {
        userData.items.forEach(userItem => {
            const userName = userItem.login 
            const userAvatar = userItem.avatar_url 
            const userProfile = userItem.html_url 

            const userEl = document.createElement('div')
            const userLink = document.createElement('a')
            userLink.href = userProfile
            userLink.target = '_blank' 
            userLink.textContent = userName 
            const avatarImg = document.createElement('img')
            avatarImg.src = userAvatar
            
            userEl.appendChild(userLink)
            userEl.appendChild(avatarImg)
            user.appendChild(userEl)


            userLink.addEventListener("click", () => {
                fetch(`https://api.github.com/users/${userName}/repos`)
                .then(resp => resp.json())
                .then(repoData => {
                    repoData.forEach(repoItem => {
                        const repoName = repoItem.name 
                        const repoLink = repoItem.html_url 

                        const repoEl = document.createElement('li')
                        const repoLinkEl = document.createElement('a')
                        repoLinkEl.href = repoLink
                        repoLinkEl.target = '_blank'
                        repoLinkEl.textContent = repoName

                        repoEl.appendChild(repoLinkEl)
                        repos.appendChild(repoEl)
                    })
                })
                .catch(error => console.log('Error fetching user repos:', error))
            })
        })
    })
    .catch(error => console.log('Error in fetching user data:', error))
    
    })



