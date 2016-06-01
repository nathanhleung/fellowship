const $days = $('#countdown #days');
const $hours = $('#countdown #hours');
const $minutes = $('#countdown #minutes');
const $seconds = $('#countdown #seconds');

const dropdate = moment([2016, 5, 1, 11, 0]);

const conversions = {
  days: 1000 * 60 * 60 * 24,
  hours: 1000 * 60 * 60,
  minutes: 1000 * 60,
  seconds: 1000
}

function updateTimer() {
    const now = moment();
    let diff = dropdate.diff(now);
    
    const days = Math.floor(diff / conversions.days);
    diff = diff - (days * conversions.days);
    const hours = Math.floor(diff / conversions.hours);
    diff = diff - (hours * conversions.hours);
    const minutes = Math.floor(diff / conversions.minutes);
    diff = diff - (minutes * conversions.minutes);
    const seconds = Math.floor(diff / conversions.seconds);
    
    $days.html(days);
    $hours.html(hours);
    $minutes.html(minutes);
    $seconds.html(seconds);
    
    // days will go below 0 first
    if (days < 0) {
      if (!$('#countdown').hasClass('hidden')) {
        $('#countdown').addClass('hidden');
      }
      if ($('#full-movie').hasClass('hidden')) {
          $('#full-movie').removeClass('hidden');
      }
    }
}

updateTimer();
setInterval(updateTimer, 1000);