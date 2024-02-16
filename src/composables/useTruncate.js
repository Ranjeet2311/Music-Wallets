const useTruncate = (str, num) => {
  // console.log(str, num)

  if (str && str.length > num) {
    return str.slice(0, num) + '...'
  } else {
    return str
  }
}

export default useTruncate
