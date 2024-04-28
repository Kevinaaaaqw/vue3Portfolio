import axios from 'axios'

export const forumCategory = (getToken: Function, domainName: string, appPoolName: string) => {
    const getCategory = async () => {
        const url = domainName + appPoolName + '/get_category'
        return await axios.get(url)
    }

    const getRecommendedAarticle = async () => {
        const url = domainName + appPoolName + '/get_recommended_article'
        return await axios.get(url)
    }

    const forumCategory = {
        getCategory: getCategory, //取得分類
        getRecommendedAarticle: getRecommendedAarticle //取得推薦文章
    }

    return forumCategory
}