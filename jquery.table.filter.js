;(function ( $, window, document, undefined ) {
    var pluginName = 'tableFilter',
        defaults = {
            itemSelector: 'tr:has(td)',
            column: 0,
            keyword: ''
        };

    function Plugin( element, options ) {
        this.element = element;
        $this = $(this.element);
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.filter(this.options.keyword, this.options.column);
    }

    Plugin.prototype.filter = function (keyword, column) {
        var that = this;
        $this.slideUp(function(){
            $this.find(that.options.itemSelector).each(function(index, item){
                console.log(keyword);
                if(keyword && $(item).find('td:eq(' + column + ')').text() !== keyword) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
            $this.slideDown();
        });
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            } else {
                $.data(this, 'plugin_' + pluginName).filter(options.keyword, options.column);
            }
        });
    };

})( jQuery, window, document );