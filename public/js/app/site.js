$(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
        $(".navbar-header").removeClass("hidden");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
        $(".navbar-header").addClass("hidden");
    }
});

$('.navbar-collapse ul li a').click(function () {
    $('.navbar-toggle:visible').click();
});

(function () {
    var app = angular.module('app', ['ngSanitize']);

    app.directive('pageScroll', pageScroll);
    function pageScroll () {
        return {
            restrict: 'C',
            link: function (scope, el, attrs) {
                el.bind('click', function (event) {
                    var $anchor = $(this);
                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top
                    }, 1500, 'easeInOutExpo');
                    event.preventDefault();
                });
            }
        }
    }

    contentSection.$inject = ['$timeout'];
    app.directive('contentSection', contentSection);
    function contentSection ($timeout) {
        return {
            restrict: 'C',
            link: function (scope, el, attrs) {
                $(window).on('resize', function () {
                    setHeight(el);
                });
                setHeight(el);
                $timeout(function () {
                    setHeight(el);
                });
            }
        }
    }

    function setHeight(el) {
        console.log('set height');
        var winH = $('body').height()
            , elH = el.height()
            , diffH = winH - elH || 0
            , calcPad = diffH / 2;

        el.css({
            'padding-top': calcPad,
            'padding-bottom': calcPad
        });
    }

    var bgColors = [
        '#b1d1e0',
        '#f8931f',
        '#c9cf31'
    ];

    var mainTmpls = [
        {
            id: 'overview',
            heading: 'Company Overview',
            content: 'r. anthony enterprises, llc (rAe) was founded by Rocco A. Piacentino as an oil field service and energy development company.' +
                'The company evolved to become a leader in alternative fuel station build and service  From natural gas to propane,' +
                'rAe has the experience to have your company reaping the benefits of America\'s vast energy resources. We deliver reliable solutions' +
                'to our clients and create long-term value. We leverage our expertise in technology, welding and business development to meet our clients’'+
                ' specific objectives and to build successful ventures with our strategic partners.'
        },
        {
            id: 'focus',
            heading: 'Market Focus',
            content: 'rAe is focused on serving the traditional and alternative energy markets.' +
                'We recognize the challenges related to energy resources that face our communities and we provide innovative,' +
                'effective solutions to those challenges.'
        },
        {
            id: 'sustain',
            heading: 'Sustainability',
            content: 'rAe is committed to building long-lasting relationships in the communities where we do business.' +
                'Environmental responsibility and community outreach programs are key to our strategic vision.' +
                'Through responsible business practices and charitable initiatives, our owners and employees are committed to adding long-term value to our communities.'
        },
        {
            id: 'contact',
            heading: 'Contact Us',
            content: '<div><a title="Info" href="mailto:info@ranthonyent.com ">info@ranthonyent.com </a></div>' +
                '<form class="form">' +
                    '<div class="col-md-8 col-md-offset-2">' +
                    '<div class="form-group ">' +
                    '<label for="name">Name</label>' +
                    '<input type="text" class="form-control" id="name" placeholder="first last">' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="email">Email</label>' +
                    '<input type="email" class="form-control" id="email" placeholder="email@example.com">' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="phone">Phone</label>' +
                    '<input type="tel" class="form-control" id="phone" placeholder="(555)555-5555">' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="comment">Comment</label>' +
                    '<textarea class="form-control" id="comment" rows="5"></textarea>' +
                    '</div>' +
                    '<button class="btn btn-primary">Submit</button>' +
                    '</div>' +
                    '</form>'
        }
    ];

    mainCtrl.$inject = ['$scope', '$templateCache'];
    app.controller('mainCtrl', mainCtrl);
    function mainCtrl ($scope, $templateCache) {
        $scope.mainTmpls = mainTmpls.map(function (item, i){
            item.tmplId = item.id + i;
            $templateCache.put(item.tmplId, item.content);
            item.isLast = !(i + 1 < mainTmpls.length);
            item.nId = '#' + (i + 1 < mainTmpls.length ? mainTmpls[i + 1].id :  mainTmpls[0].id);
            item.bg = bgColors[(i % bgColors.length)];
            return item;
        });
    }
}());
