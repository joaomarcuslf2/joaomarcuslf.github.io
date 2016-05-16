puts "Choose a option:"
puts "    1 - Create a post"
puts "    2 - Create a page"
print ">> "
op = gets.to_i

if op ==1 
	print "Say the post name: "
	pt_name = gets.chomp
	system("rake post title='#{pt_name}'")
else
	print "Say the page name: "
	pg_name = gets.chomp + ".html"
	system("rake page name='#{pg_name}'")
end