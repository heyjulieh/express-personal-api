console.log("Sanity Check: JS is working!");
var $travelList;
var allTravel = [];

$(document).ready(function(){

  $travelList = $('#travelTarget');

  $.ajax({
    method: 'GET',
    url: './api/travaledto',
    success: handleSuccess,
    error: handleError
  });

  $('#newTravelForm').on('submit', function(e) {
    e.preventDefault();
    console.log('new travel locations serialized', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/api/traveledto',
      data: $(this).serializeArray(),
      success: newTravelSuccess,
      error: newTravelError
    });
  });

  $travelList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/traveledto/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/traveledto/'+$(this).attr('data-id'),
      success: deleteTravelSuccess,
      error: deleteTravelError
    });
  });

});

function getTravelHtml(travelto) {
  return `<hr>
          <p>
            <b>${traveledto.city}</b>
            by ${(traveledto.country) ? traveledto.country.name : 'null'}
            <br>

            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${traveledto._id}>Delete</button>
          </p>
          `;
}

function getAllTravelHtml(traveledto) {
  return traveledto.map(getTravelHtml).join("");
}

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  $travelList.empty();
  var travelHtml = getAllTravelHtml(allTravel);
  // append html to the view
  $travelList.append(travelHtml);
}

function handleSuccess(json) {
  allTravel = json;
  render();
}

function handleError(e) {
  console.log('Whoops, something does not work!');
  $('#travelTarget').text('Failed to load travel locations.');
}

function newTravelSuccess(json) {
  $('#newTravelForm input').val('');
  allTravel.push(json);
  render();
}

function newTravelError() {
  console.log('Error, location not found!');
}

function deleteTravelSuccess(json) {
  var traveled = json;
  console.log(json);
  var travelId = traveled._id;
  console.log('Delete travel location', travelId);
  // find the location with the correct ID and remove it from our allTravel array
  for(var index = 0; index < allTravel.length; index++) {
    if(allTravel[index]._id === travelId) {
      allTravel.splice(index, 1);
      break;  // we found our travel location - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deleteTravelError() {
  console.log('Travel location error; could not be deleted!');
}
