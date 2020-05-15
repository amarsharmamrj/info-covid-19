$(document).ready(function() {
    // sticky navbar
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 10) {
            $("nav.desktop-menu").addClass("sticky-desktop");
        }
        if (scroll < 10) {
            $("nav.desktop-menu").removeClass("sticky-desktop");
        }
    });

    // sticky mobile navbar
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            $("nav.mobile-navbar").addClass("sticky-mobile");
        }
        if (scroll < 50) {
            $("nav.mobile-navbar").removeClass("sticky-mobile");
        }
    });

    // showing of mobile menu
    $(".menu-icon").click(function() {
        $(".mobile-menu").css("width", "90%");
        $(".mobile-menu").css("padding", "10px 15px 0px 15px");
        $(".mobile-menu").css("box-shadow", "20px 0px 20px 20px #5f605dcc");
        $("body").css("overflow", "hidden");
        $(".mobile-menu").css("overflow", "scroll");
        $(".main-layer").click(function() {
            $(".mobile-menu").css("width", "90%");
            $("body").css("overflow", "scroll");
        });
    });

    // hiding of mobile menu
    $(".close-icon").click(function() {
        $(".mobile-menu").css("width", "0%");
        $(".mobile-menu").css("padding", "0px");
        $(".mobile-menu").css("box-shadow", "0px 0px 0px 0px #5f605dcc");
        $("body").css("overflow", "scroll");
    });

    // hiding of mobile menu when menus are click
    $(".mobile-menu a").click(function() {
        $(".mobile-menu").css("width", "0%");
        $(".mobile-menu").css("padding", "0px");
        $(".mobile-menu").css("box-shadow", "0px 0px 0px 0px #5f605dcc");
        $("body").css("overflow", "scroll");
    });
    wow = new WOW({
        boxClass: 'wow', // default
        animateClass: 'animated', // default
        offset: 0, // default
        mobile: true,
        live: true // default
    })
    wow.init();

    /*..................................
                    hero section
    ..................................*/
    let bg = document.getElementById('bg');
    let moon = document.getElementById('moon');
    let mountain = document.getElementById('mountain');
    let road = document.getElementById('road');
    let text = document.getElementById('text');

    window.addEventListener('scroll', () => {
        var value = window.scrollY;

        bg.style.top = value * .5 + 'px';
        moon.style.left = -value * .5 + 'px';
        mountain.style.top = -value * .15 + 'px';
        road.style.top = value * .15 + 'px';
        text.style.top = value * 1 + 'px';
    });

    setWorldwideData();

    function setWorldwideData() {
        $.ajax({
            url: "https://disease.sh/v2/all",
            method: "GET",
            dataType: "json",
            success: function(dataWorld) {
                $("#worldwideDataSection .total-cases-count").text(dataWorld.cases);
                $("#worldwideDataSection .total-deaths-count").text(dataWorld.deaths);
                $("#worldwideDataSection .total-recovered-count").text(dataWorld.recovered);
                $("#worldwideDataSection .total-active-count").text(dataWorld.active);
                $("#worldwideDataSection .total-countries-count").text(dataWorld.affectedCountries);
                $("#worldwideDataSection .total-cases-per-million-count").text(dataWorld.casesPerOneMillion);
                $("#worldwideDataSection .total-today-cases-count").text(dataWorld.todayCases);
                $("#worldwideDataSection .total-today-deaths-count").text(dataWorld.todayDeaths);
            }
        });
    }


    /*###########################################################################
                            country wise data population
    #############################################################################*/
    //setting data for deafult
    $.ajax({
        url: "https://disease.sh/v2/countries/india",
        method: "GET",
        dataType: "json",
        success: function(countryData) {
            $("#country-wise-section .country-flag").attr("src", "" + countryData.countryInfo.flag + "");
            $("#country-wise-section .country-name").text("India");
            $("#country-wise-section .total-cases-count").text(countryData.cases);
            $("#country-wise-section .total-deaths-count").text(countryData.deaths);
            $("#country-wise-section .total-recovered-count").text(countryData.recovered);
            $("#country-wise-section .total-active-count").text(countryData.active);
            $("#country-wise-section .today-cases-count").text(countryData.todayCases);
            $("#country-wise-section .today-deaths-count").text(countryData.todayDeaths);
            $("#country-wise-section .total-cases-per-million-count").text(countryData.casesPerOneMillion);
            $("#country-wise-section .total-deaths-per-million-count").text(countryData.deathsPerOneMillion);
        }
    });

    // setting data for countries
    $("#select-country").change(function() {
        setCountryData();
        setCountryWiseGrpahData();
    });


    var country;

    function setCountryData() {
        // add loader
        $(".loader").removeClass("d-none");
        $(".loader").addClass("d-block");

        country = $("#select-country").val();
        $.ajax({
            url: "https://disease.sh/v2/countries/" + country + "",
            method: "GET",
            dataType: "json",
            success: function(countryData) {
                $("#country-wise-section .country-flag").attr("src", "" + countryData.countryInfo.flag + "");
                $("#country-wise-section .country-name").text(country);
                $("#country-wise-section .total-cases-count").text(countryData.cases);
                $("#country-wise-section .total-deaths-count").text(countryData.deaths);
                $("#country-wise-section .total-recovered-count").text(countryData.recovered);
                $("#country-wise-section .total-active-count").text(countryData.active);
                $("#country-wise-section .today-cases-count").text(countryData.todayCases);
                $("#country-wise-section .today-deaths-count").text(countryData.todayDeaths);
                $("#country-wise-section .total-cases-per-million-count").text(countryData.casesPerOneMillion);
                $("#country-wise-section .total-deaths-per-million-count").text(countryData.deathsPerOneMillion);
            }
        });
    }


    /*.........................................
             create graph for country wise 
      .........................................*/

    let countryWise = new Chart(
        document.getElementById('countryWise').getContext('2d'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                        label: 'Total Cases',
                        data: [],
                        borderColor: 'blue',
                        borderWidth: 1,
                        fill: false,
                    },
                    {
                        label: 'Total Recovered',
                        data: [],
                        borderColor: 'green',
                        borderWidth: 1,
                        fill: false,
                    },
                    {
                        label: 'Total Deaths',
                        data: [],
                        borderColor: 'red',
                        borderWidth: 1,
                        fill: false,
                    }
                ],

            },
            options: {
                legend: {
                    responsive: false,
                    maintainAspectRatio: false,
                    display: true,
                    labels: {
                        fontColor: "blue",
                        fontSize: 12,
                        boxWidth: 8
                    }
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            fontColor: "blue",
                            labelString: 'No. of Persons'
                        },
                        ticks: {
                            fontColor: "blue",
                            fontSize: 10
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            fontColor: "blue",
                            labelString: 'Date'
                        },
                        ticks: {
                            fontColor: "blue",
                            fontSize: 10
                        }
                    }]
                }
            }
        }
    );

    // setting data for country wise graph for default india
    $.ajax({
        url: "https://disease.sh/v2/historical/india",
        method: "GET",
        dataType: "json",
        success: function(countryWiseData) {
            countryWise.data.labels = Object.keys(countryWiseData.timeline.cases);
            countryWise.data.datasets[0].data = Object.values(countryWiseData.timeline.cases);
            countryWise.data.datasets[1].data = Object.values(countryWiseData.timeline.recovered);
            countryWise.data.datasets[2].data = Object.values(countryWiseData.timeline.deaths);
            countryWise.update();
        }
    });

    // setting graph data for all countries
    function setCountryWiseGrpahData() {
        $.ajax({
            url: "https://disease.sh/v2/historical/" + country + "",
            method: "GET",
            dataType: "json",
            success: function(countryWiseData) {
                countryWise.data.labels = Object.keys(countryWiseData.timeline.cases);
                countryWise.data.datasets[0].data = Object.values(countryWiseData.timeline.cases);
                countryWise.data.datasets[1].data = Object.values(countryWiseData.timeline.recovered);
                countryWise.data.datasets[2].data = Object.values(countryWiseData.timeline.deaths);
                countryWise.update();

                // remove loader
                $(".loader").addClass("d-none");
                $(".loader").removeClass("d-block");
            }
        });
    }


    /*.........................................
            create graph for all countries 
      .........................................*/

    $.ajax({
        url: "https://disease.sh/v2/countries/India,China,Italy,S. Korea,USA,Germany,France",
        method: "GET",
        dataType: "json",
        success: function(allCountriesData) {
            const countries = [
                'India',
                'China',
                'Italy',
                'S. Korea',
                'USA',
                'Germany',
                'France'
            ];
            new Chart(document.getElementById('allCountries').getContext('2d'), {
                type: 'bar',
                data: {
                    labels: countries,
                    datasets: [{
                            label: 'Total Cases',
                            data: [allCountriesData[0].cases, allCountriesData[1].cases, allCountriesData[2].cases, allCountriesData[3].cases, allCountriesData[4].cases, allCountriesData[5].cases, allCountriesData[6].cases],
                            backgroundColor: [
                                '#26b3f7d1',
                                '#26b3f7d1',
                                '#26b3f7d1',
                                '#26b3f7d1',
                                '#26b3f7d1',
                                '#26b3f7d1',
                                '#26b3f7d1'
                            ]
                        },
                        {
                            label: 'Total Deaths',
                            data: [allCountriesData[0].deaths, allCountriesData[1].deaths, allCountriesData[2].deaths, allCountriesData[3].deaths, allCountriesData[4].deaths, allCountriesData[5].deaths, allCountriesData[6].deaths],
                            backgroundColor: [
                                '#e34b57d9',
                                '#e34b57d9',
                                '#e34b57d9',
                                '#e34b57d9',
                                '#e34b57d9',
                                '#e34b57d9',
                                '#e34b57d9'
                            ]
                        },
                        {
                            label: 'Total Recovered',
                            data: [allCountriesData[0].recovered, allCountriesData[1].recovered, allCountriesData[2].recovered, allCountriesData[3].recovered, allCountriesData[4].recovered, allCountriesData[5].recovered, allCountriesData[6].recovered],
                            backgroundColor: [
                                '#05af05d9',
                                '#05af05d9',
                                '#05af05d9',
                                '#05af05d9',
                                '#05af05d9',
                                '#05af05d9',
                                '#05af05d9'
                            ]
                        }
                    ]
                },
                options: {
                    legend: {
                        display: true,
                        labels: {
                            fontColor: "blue",
                            fontSize: 12,
                            boxWidth: 8
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                fontColor: "blue",
                                labelString: 'No. of Persons'
                            },
                            ticks: {
                                fontColor: "blue",
                                fontSize: 10
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                fontColor: "blue",
                                labelString: 'Country'
                            },
                            ticks: {
                                fontColor: "blue",
                                fontSize: 10
                            }
                        }]
                    }
                }
            });
        }
    });

    /*###########################################################################
                            India Major State wise data population
    #############################################################################*/
    /*.........................................
    create line graph for India Major State wise data
      .........................................*/

    let indiaStateWiseLine = new Chart(
        document.getElementById('india-state-wise-data-line').getContext('2d'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                        label: 'Total Cases',
                        data: [],
                        borderColor: 'blue',
                        borderWidth: 1,
                        fill: true,
                    },
                    {
                        label: 'Total Recovered',
                        data: [],
                        borderColor: 'green',
                        borderWidth: 1,
                        fill: true,
                    },
                    {
                        label: 'Total Deaths',
                        data: [],
                        borderColor: 'red',
                        borderWidth: 1,
                        fill: true,
                    }
                ],

            },
            options: {
                legend: {
                    responsive: false,
                    maintainAspectRatio: false,
                    display: true,

                    labels: {
                        fontSize: 12,
                        boxWidth: 5,
                        fontColor: "blue",
                        padding: 5
                    }
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            fontColor: "blue",
                            labelString: 'No. of Persons'
                        },
                        ticks: {
                            fontColor: "blue",
                            fontSize: 10
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: false,
                            labelString: 'States'
                        },
                        ticks: {
                            fontColor: "blue",
                            fontSize: 10
                        }
                    }]
                }
            }
        }
    );

    /*.........................................
    create pie graph for India Major State wise data
      .........................................*/
    let indiaStateWisePie = new Chart(
        document.getElementById('india-state-wise-data-pie').getContext('2d'), {
            "type": "doughnut",
            "data": {
                "labels": [],
                "datasets": [{
                    "label": ["Red", "Blue", "Yellow"],
                    "data": [],
                    "backgroundColor": ["#4242f9", "#71f92d", "#f58868", "#41f7f7", "#e740fb", "#f99b27", "#2c9783", "#97532c", "#f130a4", "#069ef7", ]
                }]
            },
            options: {
                legend: {
                    responsive: false,
                    maintainAspectRatio: false,
                    display: true,
                    labels: {
                        fontColor: "blue",
                        fontSize: 10,
                        boxWidth: 10,
                        padding: 5
                    }
                }
            }
        }
    );


    // setting  graph data india major states 
    var dataLength = 10;
    var stateLabel = [dataLength];
    var stateConfirmed = [dataLength];
    var stateRecovered = [dataLength];
    var stateDeaths = [dataLength];

    $.ajax({
        url: "https://api.covid19india.org/data.json",
        method: "GET",
        dataType: "json",
        success: function(indiaStateWiseData) {
            for (var i = 1; i < dataLength; i++) {
                stateLabel.push(indiaStateWiseData.statewise[i].state);
                stateConfirmed.push(indiaStateWiseData.statewise[i].confirmed);
                stateRecovered.push(indiaStateWiseData.statewise[i].recovered);
                stateDeaths.push(indiaStateWiseData.statewise[i].deaths);

            }
            // setting data for line chart
            indiaStateWiseLine.data.labels = stateLabel;
            indiaStateWiseLine.data.datasets[0].data = stateConfirmed;
            indiaStateWiseLine.data.datasets[1].data = stateRecovered;
            indiaStateWiseLine.data.datasets[2].data = stateDeaths;
            indiaStateWiseLine.update();

            // setting data for pie chart
            indiaStateWisePie.data.labels = stateLabel;
            indiaStateWisePie.data.datasets[0].data = stateConfirmed;
            indiaStateWisePie.update();

        }
    });


    /*#################################################################################
                    state wise data table
      #################################################################################*/
    $.ajax({
        url: "https://api.covid19india.org/data.json",
        dataType: "json",
        method: "GET",
        success: function(result) {
            console.log(result);
            //total data for cards
            $("#state-wise-datatable-section .updatedOnTime").text(result.statewise[0].lastupdatedtime);
            $("#state-wise-datatable-section .total-cases-count").text(result.statewise[0].confirmed);
            $("#state-wise-datatable-section .total-deaths-count").text(result.statewise[0].deaths);
            $("#state-wise-datatable-section .total-recovered-count").text(result.statewise[0].recovered);
            $("#state-wise-datatable-section .total-active-count").text(result.statewise[0].active);

            // state wise 
            $.each(result.statewise, function(i, item) {
                $("#table-state-wise").append('<tr>' +
                    ' <td>' + item.state + '</td>' +
                    ' <td>' + item.active + '</td>' +
                    ' <td>' + item.confirmed + '</td>' +
                    ' <td>' + item.recovered + '</td>' +
                    ' <td>' + item.deaths + '</td>' +
                    ' <td>' + item.lastupdatedtime + '</td>' +
                    ' </tr>');
            });
            $('#table-state-wise').DataTable({
                "aaSorting": []
            });

            // time series
            $.each(result.cases_time_series, function(i, item) {
                $("#table-time-series").append('<tr>' +
                    ' <td>' + item.date + '</td>' +
                    ' <td>' + item.dailyconfirmed + '</td>' +
                    ' <td>' + item.dailydeceased + '</td>' +
                    ' <td>' + item.dailyrecovered + '</td>' +
                    ' <td>' + item.totalconfirmed + '</td>' +
                    ' <td>' + item.totaldeceased + '</td>' +
                    ' <td>' + item.totalrecovered + '</td>' +
                    ' </tr>');
            });
            $('#table-time-series').DataTable({
                "aaSorting": []
            });

            // tested
            $.each(result.tested, function(i, item) {
                $("#table-tested").append('<tr>' +
                    ' <td>' + item.updatetimestamp + '</td>' +
                    ' <td>' + item.totalsamplestested + '</td>' +
                    ' <td>' + item.totalpositivecases + '</td>' +
                    ' <td>' + item.testpositivityrate + '</td>' +
                    ' </tr>');
            });
            $('#table-tested').DataTable({
                "aaSorting": []
            });

        }
    });

    /*#################################################################################
                    district wise data table of india
      #################################################################################*/

    // populating data for uttar pradesh
    $("#state-wise-section .state-name").text("Uttar Pradesh");
    $.ajax({
        url: "https://api.covid19india.org/data.json",
        method: "GET",
        dataType: "json",
        success: function(result) {
            $.each(result.statewise, function(i, item) {
                // console.log(item.state);
                if (item.state === "Uttar Pradesh") {
                    $("#state-wise-section .total-cases-count").text(item.confirmed);
                    $("#state-wise-section .total-deaths-count").text(item.deaths);
                    $("#state-wise-section .total-recovered-count").text(item.recovered);
                    $("#state-wise-section .total-active-count").text(item.active);
                }
            });
        }
    });


    // data table for uttar pradesh
    $.ajax({
        url: "https://api.covid19india.org/v2/state_district_wise.json",
        method: "GET",
        dataType: "json",
        success: function(indiaDistrictWiseData) {
            var dataLength = indiaDistrictWiseData.length;
            for (var i = 0; i < dataLength; i++) {
                if (indiaDistrictWiseData[i].state === "Uttar Pradesh") {
                    $.each(indiaDistrictWiseData[i].districtData, function(i, item) {
                        $("#table-district-wise tbody").append('<tr>' +
                            ' <td class=' + item.district + '>' + item.district + '</td>' +
                            ' <td>' + item.confirmed + '</td>' +
                            ' <td>' + item.active + '</td>' +
                            ' <td>' + item.recovered + '</td>' +
                            ' <td>' + item.deceased + '</td>' +
                            ' </tr>');
                    });
                    $('#table-district-wise').DataTable({
                        "aaSorting": []
                    });
                }
            }
        }
    });


    // data table for all states
    $("#state-list").change(function() {
        $.ajax({
            url: "https://api.covid19india.org/data.json",
            method: "GET",
            dataType: "json",
            success: function(result) {
                $.each(result.statewise, function(i, item) {
                    if (item.state === state) {
                        $("#state-wise-section .total-cases-count").text(item.confirmed);
                        $("#state-wise-section .total-deaths-count").text(item.deaths);
                        $("#state-wise-section .total-recovered-count").text(item.recovered);
                        $("#state-wise-section .total-active-count").text(item.active);
                    }
                });
            }
        });


        state = $("#state-list").val();
        $("#state-wise-section .state-name").text(state);
        $('#table-district-wise').DataTable().destroy();
        $("#table-district-wise tbody").empty();
        $.ajax({
            url: "https://api.covid19india.org/v2/state_district_wise.json",
            method: "GET",
            dataType: "json",
            success: function(indiaDistrictWiseData) {
                var dataLength = indiaDistrictWiseData.length;
                for (var i = 0; i < dataLength; i++) {
                    if (indiaDistrictWiseData[i].state === state) {
                        $.each(indiaDistrictWiseData[i].districtData, function(i, item) {
                            $("#table-district-wise tbody").append('<tr>' +
                                ' <td>' + item.district + '</td>' +
                                ' <td>' + item.confirmed + '</td>' +
                                ' <td>' + item.active + '</td>' +
                                ' <td>' + item.recovered + '</td>' +
                                ' <td>' + item.deceased + '</td>' +
                                ' </tr>');
                        });
                        $('#table-district-wise').DataTable({
                            "aaSorting": []
                        });
                    }
                }
            }
        });
    });


    /*#################################################################################
                  zone wise district of india
      #################################################################################*/
    $.ajax({
        url: "https://api.covid19india.org/zones.json",
        method: "GET",
        dataType: "json",
        success: function(result) {
            $.each(result.zones, function(i, item) {
                if (item.zone === "Green") {
                    $("#table-zone-wise-district tbody").append('<tr>' +
                        ' <td class="green">' + item.district + '</td>' +
                        ' <td class="green1">' + item.zone + '</td>' +
                        ' <td class="green2">' + item.state + '</td>' +
                        ' </tr>');
                } else if (item.zone === "Red") {
                    $("#table-zone-wise-district tbody").append('<tr>' +
                        ' <td class="red">' + item.district + '</td>' +
                        ' <td  class="red1">' + item.zone + '</td>' +
                        ' <td  class="red2">' + item.state + '</td>' +
                        ' </tr>');
                } else if (item.zone === "Orange") {
                    $("#table-zone-wise-district tbody").append('<tr>' +
                        ' <td class="orange">' + item.district + '</td>' +
                        ' <td class="orange1">' + item.zone + '</td>' +
                        ' <td class="orange2">' + item.state + '</td>' +
                        ' </tr>');
                } else {
                    $("#table-zone-wise-district tbody").append('<tr>' +
                        ' <td>' + item.district + '</td>' +
                        ' <td>' + item.zone + '</td>' +
                        ' <td>' + item.state + '</td>' +
                        ' </tr>');
                }
            });
            $('#table-zone-wise-district').DataTable({
                "aaSorting": []
            });
        }
    });



});
