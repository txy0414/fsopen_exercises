const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
} 

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, current)=>{
        return (current.likes > max.likes) ? current : max
    }, blogs[0])
} 

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}