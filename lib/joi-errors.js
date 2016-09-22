export default function(error){
  let errors = {}

  error = (error || {details: []})
  error.details.forEach(function(detail) {
    errors[detail.path] = detail.message
  })

  return errors
}
